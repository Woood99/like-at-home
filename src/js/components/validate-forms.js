import Inputmask from "../../../node_modules/inputmask/dist/inputmask.es6.js";
import JustValidate from "just-validate";

const validateForms = (formEl, rules) => {
    if (!formEl) return;
    const validation = new JustValidate(formEl, {
        validateBeforeSubmitting: true,
        lockForm: false
    });

    for (let item of rules) {
        if (item.tel) {
            const inputMask = new Inputmask("+7 (999) 999-99-99");
            inputMask.mask(formEl.querySelector(item.ruleSelector));
        }
        validation.addField(item.ruleSelector, item.rules);
    }

    validation.onSuccess(() => {
        formEl.classList.add("is-valid");
    });

    validation.onFail(e => {
        formEl.classList.remove("is-valid");
    });
};
export default validateForms;
