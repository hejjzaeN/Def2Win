export enum ErrorDescription {
    ERR_AUTH_ALREADY_EXIST = 'Пользователь уже существует. Свяжитесь с администратором.',
    ERR_AUTH_PENDING = 'Ваш аккаунт на проверке. Дождитесь подтверждения администратора.',
    ERR_AUTH_INVALID_CREDENTIALS = 'Данные неверны.',
    ERR_AUTH_EMPTY_VALUES = 'Необходимо заполнить все поля.',
    ERR_AUTH_EXCEED_LOGIN_ATTEMPTS = 'Превышено количество попыток для входа. Обратитесь к администратору.',
    ERR_DB_CREATE_ERR = 'Пользователь не может быть создан.',
    ERR_DB_UPDATE_ERR = 'Не могу обновить пользователя.',
    ERR_DB_DELETE_ERR = 'Не могу удалить пользователя.',
    ERR_USERS_READ_NO_EXIST = 'Пользователь не существует.',
    ERR_ACCESS_NOT_ALLOWED = 'Операция запрещена.',
}