import React, { useState, useEffect } from "react";
import {
    CButton,  
    CCol,    
    CRow, 

} from '@coreui/react';
import useApi from '../services/api'
const ResetBanco = () => {
    const api = useApi();

    const handleResetButton = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir?')) {
            const result = await api.resetarBanco();
            if (result.error === '' || result.error === undefined) {
                // Remova o item da lista atual de arquivos
                alert('banco resetado com sucesso!!')
            } else {
                alert(result.error);
            }
        }
    };


    return (
        <>
            <CRow>
                <CCol>
                    <h2>Resetar Banco? </h2>
                    <CButton color="info" onClick={() => handleResetButton()} >
                        Sim quero resetar
                    </CButton>
                </CCol>
            </CRow>

        </>
    )


};
export default ResetBanco;