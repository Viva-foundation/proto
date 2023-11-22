# Viva-med proto frontend 

## Translation
At the end of almost all .vue file inside the 'frank-zombie/src/components' folder, there is a '<i18n>' section.
This object contains all the text that is displayed on the page. To translate the page, simply change the text inside 
corresponding language.

Example from `frank-zombie/src/view/login-view.vue`
```
<i18n>
{
  "en": {
    "email": "Email",
    "password": "Password",
    "wrong_user_or_password": "Wrong user or password",
    "login_action": "Login"
  },
  "am": {
    "email": "Էլ․ հասցե",
    "password": "Գաղտնաբառ",
    "wrong_user_or_password": "Սխալ օգտվող կամ գաղտնաբառ",
    "login_action": "Մուտք"
  }
}
</i18n>
```