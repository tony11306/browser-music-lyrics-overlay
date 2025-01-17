export function checkEmptyContent(content: string): boolean {
    content = content.replace(/\n/g, '').replace(/ /g, '');
    return content === '';
}