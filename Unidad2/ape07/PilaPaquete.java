// Trabajar con LIFO  
public class PilaPaquete {
    private Paquete[] stack;
    private int top;

    public PilaPaquete(int capacidad) {
        this.stack = new Paquete[capacidad];
        this.top = -1;
    }

    public void push(Paquete p) {
        if (top < stack.length - 1) {
            top++;
            stack[top] = p;
        }
    }

    public Paquete pop() {
        if (top != -1) {
            Paquete temp = stack[top];
            stack[top] = null;
            top--;
            return temp;
        }
        return null;
    }
}