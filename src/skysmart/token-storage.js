class TokenStorage {
  static getToken() {
    var tokenCollection = JSON.parse(localStorage['edu-token-collection']);
    var token = tokenCollection[Object.keys(tokenCollection)[0]].token;

    if (token == undefined) {
      alert("[SchoolAssistantExtension] Ошибка. Авторизуйтесь заново в системе");
    }
    return token;
  }
}
