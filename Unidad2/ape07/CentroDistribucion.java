import java.util.ArrayList;
import java.util.Random;

public class CentroDistribucion {
    private ArrayList<Paquete> inventario;

    public CentroDistribucion() {
        this.inventario = new ArrayList<>();
    }

    public void recibirCajaCamion(Paquete p) {
        this.inventario.add(p);
    }

    public Paquete despacharACliente() {
        if (!this.inventario.isEmpty()) {
            return this.inventario.remove(this.inventario.size() - 1);
        }
        return null;
    }

    public void ordenarRutaBurbuja() {
        int n = this.inventario.size();
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n - 1 - i; j++) {
                if (this.inventario.get(j).getCodigoPostal() > this.inventario.get(j + 1).getCodigoPostal()) {
                    Paquete temp = this.inventario.get(j);
                    this.inventario.set(j, this.inventario.get(j + 1));
                    this.inventario.set(j + 1, temp);
                }
            }
        }
    }

    public void ordenarRutaMergeSort() {
        if (this.inventario.size() > 1) {
            mergeSort(0, this.inventario.size() - 1);
        }
    }

    private void mergeSort(int inicio, int fin) {
        if (inicio < fin) {
            int medio = inicio + (fin - inicio) / 2;
            mergeSort(inicio, medio);
            mergeSort(medio + 1, fin);
            merge(inicio, medio, fin);
        }
    }

    private void merge(int inicio, int medio, int fin) {
        ArrayList<Paquete> izquierda = new ArrayList<>();
        ArrayList<Paquete> derecha = new ArrayList<>();

        for (int i = inicio; i <= medio; i++) {
            izquierda.add(this.inventario.get(i));
        }
        for (int j = medio + 1; j <= fin; j++) {
            derecha.add(this.inventario.get(j));
        }

        int i = 0;
        int j = 0;
        int k = inicio;

        while (i < izquierda.size() && j < derecha.size()) {
            // ASCENDENTE: <= | DESCENDENTE: >=
            if (izquierda.get(i).getCodigoPostal() >= derecha.get(j).getCodigoPostal()) {
                this.inventario.set(k++, izquierda.get(i++));
            } else {
                this.inventario.set(k++, derecha.get(j++));
            }
        }

        while (i < izquierda.size()) {
            this.inventario.set(k++, izquierda.get(i++));
        }

        while (j < derecha.size()) {
            this.inventario.set(k++, derecha.get(j++));
        }
    }

    public static void main(String[] args) {
        CentroDistribucion centro = new CentroDistribucion();
        Random random = new Random(42);
        System.out.println("Generar una semilla de 10000 paquetes con códigos postales para el almacén....");
        for (int i = 0; i < 10000; i++) {
            int cp = random.nextInt(50) + 110101;
            centro.recibirCajaCamion(new Paquete(i, cp));
        }

        System.out.println("Ordenar los paquetes por código postal usando Merge Sort...");
        long inicio = System.currentTimeMillis();
        centro.ordenarRutaMergeSort();
        long fin = System.currentTimeMillis();
        double tiempoSegundos = (fin - inicio) / 1000.0;
        System.out.println("Tiempo de Ordenamiento: " + tiempoSegundos + " segundos");

        System.out.println("Despachar los paquetes a los clientes...");
        Paquete despachado = centro.despacharACliente();
        if (despachado != null) {
            System.out.println("Paquete entregado: " + despachado.getId());
        }
    }
}