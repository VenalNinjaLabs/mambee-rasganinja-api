export const EXCEPTION = {
    INVALID_CREDENTIALS: {
        status: 'ERROR',
        internalCode: '01',
        httpCode: 401,
        message: 'Credenciais inválidas'
    },
    UNAUTHENTICATED: {
        status: 'ERROR',
        internalCode: '02',
        httpCode: 401,
        message: 'Usuário não autenticado'
    },
    UNAUTHORIZED: {
        status: 'ERROR',
        internalCode: '02',
        httpCode: 403,
        message: 'Usuário não autorizado'
    },
    VALIDATION: {
        status: 'ERROR',
        internalCode: '03',
        httpCode: 400,
        message: 'Informações pendentes ou incorretas'
    },
    ONLY_ONE_DEFAULT_ADMIN: {
        status: 'ERROR',
        internalCode: '04',
        httpCode: 400,
        message: 'Deve haver somente um administrador padrão no sistema'
    },
    AT_LEAST_DEFAULT_ADMIN: {
        status: 'ERROR',
        internalCode: '05',
        httpCode: 400,
        message: 'Deve haver pelo menos um administrador padrão no sistema'
    },
    CANNOT_DEACTIVE_DEFAULT_ADMIN: {
        status: 'ERROR',
        internalCode: '06',
        httpCode: 400,
        message: 'Não é possível desativar a conta padrão de Administrador'
    },
    ALREADY_EXISTS: {
        status: 'ERROR',
        internalCode: '07',
        httpCode: 406,
        message: 'Já existe um registro correspondente à estas informações'
    },
    UNDEFINED: {
        status: 'ERROR',
        internalCode: '00',
        httpCode: 500,
        message: 'Erro inesperado. Tente novamente mais tarde ou contate o administrador'
    }
};