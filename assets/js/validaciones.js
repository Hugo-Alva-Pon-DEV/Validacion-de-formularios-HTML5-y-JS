export function validar (input){
    const inputType = input.dataset.type;
    if(validadores[inputType]){
        validadores[inputType](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeError(inputType, input);

    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
]



const mensajesError = {
    name: {
        valueMissing: 'Este campo nombre no puede estar vacio'
    },

    email: {
        valueMissing: 'El correo es obligatorio, para poder comunicarnos contigo',
        typeMismatch: 'Introduce formato de correo válido'
    },

    password: {
        valueMissing: 'Este campo contraseña no puede estar vacio',
        patternMismatch: 'Al menos 6 caracteres máximo 12, debe conter una letra minúscula una mayúscula, un número y sin caracteres especiales'
    },

    birth: {
        valueMissing: 'Por favor ingresa tu fecha de nacimiento',
        customError : 'Debes tener al menos 18 años de edad'
    },

    telphone: {
        valueMissing: 'Esté campo no puedes estar vácio dado que es otra forma más directa de contactarnos contigo',
        patternMismatch: 'El formato requerido es de XXXXXXXXXX 10 números',
    },

    address: {
        valueMissing: 'Esté campo no puedes estar vácio',
        patternMismatch: 'La Dirección debe contener de 10 a 40 catacteres.',
    },

    city: {
        valueMissing: 'Esté campo no puedes estar vácio',
        patternMismatch: 'La Ciudad debe contener de 4 a 30 catacteres.',
    },

    estado: {
        valueMissing: 'Esté campo no puedes estar vácio',
        patternMismatch: 'El Estado debe contener de 4 a 30 catacteres.',
    },
};


const validadores = {
    birth: (input) =>  validarNacimiento(input),
}

function mostrarMensajeError(inputType, input){
    let msj = ""
    tipoDeErrores.forEach(error => {
        if(input.validity[error]){
            console.log(inputType, error);
            console.log(input.validity[error]);
            console.log(mensajesError[inputType][error]);
            msj = mensajesError[inputType][error];
        }
    });


    return msj;
}

function validarNacimiento(input){
    const userDate = new Date (input.value);
    let msj = "";
    if(!mayorEdad(userDate)){
        msj = "Debes tener al menos 18 años de edad";
    };
    input.setCustomValidity(msj);
}

function mayorEdad (userDate){
    const actualDate = new Date ();
    const diffDates = new Date(
        userDate.getUTCFullYear() + 18,
        userDate.getUTCMonth(),
        userDate.getUTCDate());
    return(diffDates <= actualDate);
}