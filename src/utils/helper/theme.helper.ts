import { isDarkTheme } from "../../Config"

export const isDarkThemeWithExtraClass = (type: string, classes: [string]) => {

    let fullClasses = '';
    for(const cssClass of classes) {
        fullClasses += `${cssClass} `;
    }

    return `${isDarkTheme ? 'dark' : 'light'}-${type}-btn ${fullClasses}`;
}