export const isDarkThemeWithExtraClass = (isDarkTheme = true, classes: string[]) => {

    let fullClasses = '';
    for(const cssClass of classes) {
        fullClasses += `${cssClass} `;
    }

    return `${isDarkTheme ? 'dark' : 'light'} ${fullClasses}`;
}