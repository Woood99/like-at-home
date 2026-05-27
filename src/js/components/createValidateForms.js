import Api from "./api.js";
import validateForms from "./validate-forms.js";

const createValidateForms = () => {
    const formBidForm = document.querySelector("#form-bid");
    const createBidForm = document.querySelector("#create-bid-form");

    if (createBidForm) {
        validateForms(createBidForm, [
            {
                ruleSelector: "[name='name']",
                rules: [
                    {
                        rule: "required",
                        value: true,
                        errorMessage: "Обязательное поле"
                    }
                ]
            },
            {
                ruleSelector: "[name='email']",
                rules: [
                    {
                        rule: "required",
                        value: true,
                        errorMessage: "Обязательное поле"
                    },
                    {
                        rule: "email",
                        errorMessage: "Введите корректный email"
                    }
                ]
            },
            {
                ruleSelector: "[name='phone']",
                tel: true,
                rules: [
                    {
                        rule: "required",
                        value: true,
                        errorMessage: "Обязательное поле"
                    },
                    {
                        rule: "function",
                        validator: function () {
                            const phone = createBidForm.querySelector("[name='phone']")?.inputmask.unmaskedvalue();
                            return phone.length === 10;
                        },
                        errorMessage: "Введите корректный телефон"
                    }
                ]
            },
            {
                ruleSelector: "[name='company']",
                rules: [
                    {
                        rule: "required",
                        value: true,
                        errorMessage: "Обязательное поле"
                    }
                ]
            },
            {
                ruleSelector: "[name='agreement']",
                rules: [
                    {
                        rule: "required",
                        value: true,
                        errorMessage: "Обязательное поле"
                    }
                ]
            }
        ]);

        createBidForm.addEventListener("submit", requestForm);
    }

    document.querySelectorAll("[data-create-bid-form-mini]").forEach(createBidFormMini => {
        validateForms(createBidFormMini, [
            {
                ruleSelector: "[name='phone']",
                tel: true,
                rules: [
                    {
                        rule: "required",
                        value: true,
                        errorMessage: "Обязательное поле"
                    },
                    {
                        rule: "function",
                        validator: function () {
                            const phone = createBidFormMini.querySelector("[name='phone']")?.inputmask.unmaskedvalue();
                            return phone.length === 10;
                        },
                        errorMessage: "Введите корректный телефон"
                    }
                ]
            },

            {
                ruleSelector: "[name='agreement']",
                rules: [
                    {
                        rule: "required",
                        value: true,
                        errorMessage: "Обязательное поле"
                    }
                ]
            }
        ]);

        createBidFormMini.addEventListener("submit", requestForm);
    });

    if (formBidForm) {
        validateForms(formBidForm, [
            {
                ruleSelector: "[name='name']",
                rules: [
                    {
                        rule: "required",
                        value: true,
                        errorMessage: "Обязательное поле"
                    }
                ]
            },
            {
                ruleSelector: "[name='email']",
                rules: [
                    {
                        rule: "required",
                        value: true,
                        errorMessage: "Обязательное поле"
                    },
                    {
                        rule: "email",
                        errorMessage: "Введите корректный email"
                    }
                ]
            },
            {
                ruleSelector: "[name='phone']",
                tel: true,
                rules: [
                    {
                        rule: "required",
                        value: true,
                        errorMessage: "Обязательное поле"
                    },
                    {
                        rule: "function",
                        validator: function () {
                            const phone = formBidForm.querySelector("[name='phone']")?.inputmask.unmaskedvalue();
                            return phone.length === 10;
                        },
                        errorMessage: "Введите корректный телефон"
                    }
                ]
            },
            {
                ruleSelector: "[name='agreement']",
                rules: [
                    {
                        rule: "required",
                        value: true,
                        errorMessage: "Обязательное поле"
                    }
                ]
            }
        ]);

        formBidForm.addEventListener("submit", requestForm);
    }

    function requestForm(e) {
        const target = e.target;
        if (target.classList.contains("is-valid")) {
            const formData = new FormData(target);
            const resp = new Api().sendRequest(formData);
            resp.then(isSuccess => {
                target.reset();
                if (isSuccess) {
                    createModalSuccess();
                } else {
                    createModalError();
                }
            });
        }
    }

    function createModalSuccess() {
        window.modal.animation = "fadeInUp";
        window.modal.speed = 350;
        window.modal._nextContainer = document.querySelector(`[data-graph-target="success-bid"]`);
        window.modal.open();
        ym(105410871, "reachGoal", "zakaz");
    }

    function createModalError() {
        window.modal.animation = "fadeInUp";
        window.modal.speed = 350;
        window.modal._nextContainer = document.querySelector(`[data-graph-target="error-bid"]`);
        window.modal.open();
    }
};

export default createValidateForms;
