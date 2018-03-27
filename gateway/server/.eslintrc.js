module.exports = {
    "env": {
        "node": true
    },
    "parserOptions": {
      "ecmaVersion": 8
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
            "never"
        ],
        "no-await-in-loop": "error",
        "for-direction": "error",
        "block-scoped-var": "error"
    }
};