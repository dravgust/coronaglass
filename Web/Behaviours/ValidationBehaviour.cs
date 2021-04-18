using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CoronaGlass.Core.Exceptions;
using CoronaGlass.Core.Extensions;
using FluentValidation;
using FluentValidation.Results;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Web.Behaviours
{
    public class ValidationBehaviour<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse> where TRequest : IRequest<TResponse>
    {
        private readonly ILogger<ValidationBehaviour<TRequest, TResponse>> _logger;
        private readonly IEnumerable<IValidator<TRequest>> _validators;

        public ValidationBehaviour(IEnumerable<IValidator<TRequest>> validators,
            ILogger<ValidationBehaviour<TRequest, TResponse>> logger)
        {
            _validators = validators;
            _logger = logger;
        }

        public async Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate<TResponse> next)
        {
            if (_validators.Any())
            {
                string typeName = request.GetGenericTypeName();
                //_logger.LogInformation("----- Validating command {CommandType}", typeName);

                ValidationContext<TRequest> context = new(request);
                ValidationResult[] validationResults =
                    await Task.WhenAll(_validators.Select(v => v.ValidateAsync(context, cancellationToken)));
                List<ValidationFailure> failures = validationResults.SelectMany(result => result.Errors)
                    .Where(error => error != null).ToList();
                if (failures.Any())
                {
                    _logger.LogWarning(
                        "Validation errors - {CommandType} - Command: {@Command} - Errors: {@ValidationErrors}",
                        typeName, request, failures);

                    throw new DomainException(
                        $"Command Validation Errors for type {typeof(TRequest).Name}",
                        new ValidationException("Validation exception", failures));
                }

            }

            return await next();
        }
    }
}
