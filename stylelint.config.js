module.exports = {
    extends: ['stylelint-config-recommended'],
    rules: {
      "named-grid-areas-no-invalid": null,  
      "at-rule-no-unknown": [
        true,
        {
          ignoreAtRules: [
            "tailwind",
            "apply",
            "variants",
            "responsive",
            "screen",
          ],
        },
      ],
      "declaration-block-trailing-semicolon": null,
      "no-descending-specificity": null,
    },
  };