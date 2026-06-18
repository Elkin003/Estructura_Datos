public class GestorRutas {
    public static void ordenar(Paquete[] datos) {
        int n = datos.length;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n - 1 - i; j++) {
                if (datos[j].getCodigoPostal() > datos[j + 1].getCodigoPostal()) {
                    Paquete temp = datos[j];
                    datos[j] = datos[j + 1];
                    datos[j + 1] = temp;
                }
            }
        }
    }
}