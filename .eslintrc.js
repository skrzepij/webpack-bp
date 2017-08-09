module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "jquery": true
    },
    "parserOptions": {
      "ecmaVersion": 7
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": [
          "error",
          {
            allow: ["warn", "error"]
          }
        ]
    },
    "globals": {
      "$": true,
      "_": true
    }
};