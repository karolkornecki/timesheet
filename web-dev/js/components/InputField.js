import React from 'react';

export const InputField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <input  {...input}
            placeholder={label}
            type={type}
            className="form-control"/>

        <div>
            <p className="help-block">
                {touched && error && <span className="validation-error">{error}</span>}
            </p>
        </div>
    </div>
)