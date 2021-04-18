using FluentValidation;

namespace Web.Extensions
{
    public static class ValidatorExtensions
    {
        public static IRuleBuilder<T, string> PhoneNumber<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder
                //.NotEmpty()
                .Length(5, 21).WithMessage("Invalid Phone Number length")
                .Matches("^[\\d]+$").WithMessage("Invalid Phone Number format");

            return options;
        }
    }
}
