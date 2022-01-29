export class StringUtils {
    public static soNumeros(numero: string): string {
        return numero.replace(/[^0-9]/g,'');
    }
}