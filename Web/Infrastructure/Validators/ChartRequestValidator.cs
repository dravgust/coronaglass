using FluentValidation;
using Web.Features.Tools;

namespace Web.Infrastructure.Validators
{
    public class SmartCutModelValidator<T> : AbstractValidator<T> where T : RunOptimizationQuery
    {
        protected SmartCutModelValidator()
        {
            RuleFor(q => q.ProjectName).NotEmpty();
        }
    }
}
