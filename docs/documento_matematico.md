# UNIVERSIDAD NACIONAL DE COLOMBIA — SEDE BOGOTÁ
**Matemáticas Discretas I (2025963) — Documento Matemático Formal**  
**Proyecto:** *Paradoja Dimensional: Juego de Supervivencia y Optimización sobre Árboles Binarios de Decisión*  
*Entrega de Avance Técnico y Matemático — Diciembre de 2026*

---

## 1. Definiciones Formales del Modelo

### Definición 1.1 (Árbol Binario de Decisión con Raíz)
El espacio de estados y decisiones del videojuego se define formalmente como una tupla $T = (V, E, r)$, donde:
1. **$V$** es un conjunto finito y no vacío de vértices (escenarios narrativos), particionado en dos subconjuntos disjuntos:
   $$V = V_I \cup L, \qquad V_I \cap L = \emptyset$$
   donde $V_I$ denota el conjunto de **vértices internos** (estados de decisión) y $L$ denota el conjunto de **hojas** (estados terminales).
2. **$r \in V_I$** es un vértice distinguido denominado **raíz**, que representa el estado inicial de toda partida.
3. **$E \subseteq V_I \times V$** es el conjunto de aristas dirigidas (transiciones), generado por una función total de transición binaria:
   $$\delta: V_I \times \Sigma \to V, \qquad \Sigma = \{0, 1\}$$
   tal que para todo $u \in V_I$, las imágenes $u_0 = \delta(u, 0)$ y $u_1 = \delta(u, 1)$ satisfacen $u_0 \neq u_1$ (todo nodo interno tiene grado de salida exacto $\deg^+(u) = 2$).
4. **Propiedad de árbol con raíz:** Todo vértice $v \in V \setminus \{r\}$ tiene grado de entrada exacto $\deg^-(v) = 1$ (existe un único padre), la raíz cumple $\deg^-(r) = 0$, y para cada $v \in V$ existe un único camino simple dirigido desde $r$ hasta $v$.

---

### Definición 1.2 (Profundidad, Altura y Subárboles Inducidos)
1. **Profundidad $d(v)$:** Para cada $v \in V$, $d(v) \in \mathbb{N}$ es la longitud (número de aristas) del único camino dirigido desde $r$ hasta $v$. En particular, $d(r) = 0$ y si $w = \delta(u, a)$, entonces $d(w) = d(u) + 1$.
2. **Altura de un vértice $h(v)$:** Se define recursivamente de abajo hacia arriba:
   $$h(v) = \begin{cases} 0 & \text{si } v \in L, \\ 1 + \max\big(h(\delta(v, 0)),\, h(\delta(v, 1))\big) & \text{si } v \in V_I. \end{cases}$$
3. **Altura del árbol $h(T)$:** Es la altura de su vértice raíz, $h = h(T) = h(r) = \max_{v \in L} d(v)$.
4. **Subárbol inducido $T_v$:** Para cada $v \in V$, $T_v = (V_v, E_v, v)$ es el subárbol binario con raíz en $v$ conformado por $v$ y todos sus descendientes alcanzables mediante iteraciones de $\delta$. Se denota por $L_v = L \cap V_v$ al conjunto de hojas de $T_v$.

---

### Definición 1.3 (Vector de Estado y Lógica de Supervivencia)
A cada escenario $v \in V$ se le asocia un **vector de estado discreto**:
$$S(v) = (e_v, p_v) \in \mathbb{N} \times \{0, 1\}$$
donde:
* $e_v \in \mathbb{N}$ representa las unidades de energía restantes en la pistola de portales.
* $p_v \in \{0, 1\}$ es la valuación de verdad de la proposición atómica $P(v)$: *"el jugador posee fluido dimensional estable en el escenario $v$"*.

Definimos sobre $V$ la fórmula proposicional de **condición de supervivencia** $\Phi(v)$:
$$\Phi(v) \equiv (e_v > 0) \land (p_v = 1)$$
Con base en ella, se establece la **función de evaluación terminal** $W: L \to \{0, 1\}$:
$$W(l) = \begin{cases} 1 & \text{si } \Phi(l) \text{ es verdadera (Victoria)}, \\ 0 & \text{si } \neg\Phi(l) \text{ es verdadera (Derrota)}. \end{cases}$$

---

### Definición 1.4 (Partida y Conjunto de Estados Ganadores)
1. **Partida:** Una partida completa es una sucesión finita de vértices $\pi = (v_0, v_1, \dots, v_k)$ tal que $v_0 = r$, $v_k \in L$, y para cada $i \in \{0, \dots, k-1\}$ existe $a_i \in \{0, 1\}$ tal que $v_{i+1} = \delta(v_i, a_i)$. La palabra binaria asociada $\omega = a_0 a_1 \dots a_{k-1} \in \Sigma^k$ constituye la estrategia del jugador.
2. **Conjunto de Estados Ganadores $G \subseteq V$:** Un vértice $v \in V$ pertenece a $G$ si y solo si existe al menos una hoja $l \in L_v$ en el subárbol $T_v$ tal que $W(l) = 1$ (es decir, desde $v$ aún existe al menos una secuencia de decisiones que conduce a la victoria).

---

## 2. Lema Auxiliar sobre Subárboles Binarios

### Lema 2.1 (Descomposición y Altura de Subárboles Hijos)
Sea $T = (V, E, r)$ un árbol binario de decisión y sea $v \in V_I$ un vértice interno con hijos $v_0 = \delta(v, 0)$ y $v_1 = \delta(v, 1)$. Entonces:
1. Los conjuntos de vértices $V_{v_0}$ y $V_{v_1}$ son disjuntos ($V_{v_0} \cap V_{v_1} = \emptyset$), y el conjunto de hojas de $T_v$ es la unión disjunta:
   $$L_v = L_{v_0} \sqcup L_{v_1}$$
2. La altura de ambos subárboles hijos satisface $h(v_0) \leq h(v) - 1$ y $h(v_1) \leq h(v) - 1$.

**Demostración:**
1. Supóngase por contradicción que existe $z \in V_{v_0} \cap V_{v_1}$. Entonces existe un camino dirigido de $v_0$ a $z$ y otro de $v_1$ a $z$. Al concatenarlos con las aristas $(v, v_0)$ y $(v, v_1)$, obtenemos dos caminos dirigidos distintos desde $v$ hasta $z$ (pues $v_0 \neq v_1$ por la Definición 1.1). Concatenando el único camino de $r$ a $v$, existirían dos caminos distintos de $r$ a $z$, contradiciendo el axioma 4 de la Definición 1.1. Por tanto $V_{v_0} \cap V_{v_1} = \emptyset$, y al intersectar con $L$ resulta $L_v = L_{v_0} \sqcup L_{v_1}$.
2. Por la Definición 1.2, $h(v) = 1 + \max(h(v_0), h(v_1))$. Luego $\max(h(v_0), h(v_1)) = h(v) - 1$, de donde inmediatamente $h(v_0) \leq h(v) - 1$ y $h(v_1) \leq h(v) - 1$. $\blacksquare$

---

## 3. Teoremas Principales y Demostraciones

### Teorema 3.1 (Acotamiento de Estados Terminales y Terminación Garantizada)
Sea $T = (V, E, r)$ un árbol binario de decisión de altura $h \geq 0$. Entonces se cumplen las siguientes dos propiedades:
1. **Cota superior de hojas:** El número total de estados terminales está acotado por $|L| \leq 2^h$.
2. **Terminación finita:** Toda partida $\pi = (v_0, v_1, \dots, v_k)$ finaliza en a lo sumo $k \leq h$ decisiones.

**Demostración:**
Demostraremos la parte (1) mediante **inducción fuerte sobre la altura $h$** de cualquier subárbol $T_v$ (es decir, probaremos que $|L_v| \leq 2^{h(v)}$ para todo $v \in V$, y el resultado global se obtendrá tomando $v = r$).

* **Caso base ($h(v) = 0$):**
  Si $h(v) = 0$, por la Definición 1.2 se tiene necesariamente que $v \in L$ (pues todo vértice interno cumple $h(v) \geq 1$). En consecuencia, $V_v = \{v\}$ y $L_v = \{v\}$, por lo que:
  $$|L_v| = 1 = 2^0 = 2^{h(v)}$$
  Luego la desigualdad se cumple con igualdad en el caso base.

* **Hipótesis inductiva:**
  Sea $m \geq 1$ un entero. Supóngase que para todo vértice $u \in V$ cuya altura satisfaga $0 \leq h(u) < m$, se cumple $|L_u| \leq 2^{h(u)}$.

* **Paso inductivo ($h(v) = m$):**
  Sea $v \in V$ un vértice con $h(v) = m \geq 1$. Dado que $h(v) > 0$, se sigue que $v \in V_I$, por lo que $v$ posee exactamente dos hijos distintos $v_0 = \delta(v, 0)$ y $v_1 = \delta(v, 1)$.
  Por el Lema 2.1, se tiene que $L_v = L_{v_0} \sqcup L_{v_1}$ con $h(v_0) \leq m - 1 < m$ y $h(v_1) \leq m - 1 < m$. Aplicando el principio de adición para conjuntos disjuntos y la hipótesis inductiva a $v_0$ y $v_1$:
  $$|L_v| = |L_{v_0}| + |L_{v_1}| \leq 2^{h(v_0)} + 2^{h(v_1)}$$
  Dado que la función exponencial $f(x) = 2^x$ es estrictamente creciente en $\mathbb{N}$ y $h(v_0), h(v_1) \leq m - 1$, se obtiene:
  $$|L_v| \leq 2^{m - 1} + 2^{m - 1} = 2 \cdot 2^{m - 1} = 2^m = 2^{h(v)}$$
  Por el principio de inducción matemática, $|L_v| \leq 2^{h(v)}$ para todo $v \in V$. Evaluando en la raíz $v = r$ con $h(r) = h$, concluimos que $|L| \leq 2^h$.

* **Demostración de (2) (Terminación):**
  Sea $\pi = (v_0, v_1, \dots, v_k)$ una partida cualquiera con $v_0 = r$ y $v_k \in L$. Por construcción, $\pi$ es un camino simple dirigido de longitud $k$ desde $r$ hasta $v_k$, por lo que $k = d(v_k)$. Por la Definición 1.2, la altura del árbol es $h = \max_{l \in L} d(l)$. Dado que $v_k \in L$, se sigue inmediatamente que:
  $$k = d(v_k) \leq \max_{l \in L} d(l) = h$$
  Es decir, ninguna partida puede entrar en ciclos infinitos y toda ejecución termina en a lo sumo $h$ decisiones. $\blacksquare$

---

### Teorema 3.2 (Caracterización Recursiva del Conjunto de Estados Ganadores)
Sea $T = (V, E, r)$ un árbol binario de decisión y sea $G \subseteq V$ el conjunto de estados ganadores (Definición 1.4). Para todo vértice $v \in V$, se cumple la equivalencia lógica:
$$v \in G \iff \big(v \in L \land W(v) = 1\big) \lor \Big(v \in V_I \land \big(\delta(v, 0) \in G \lor \delta(v, 1) \in G\big)\Big)$$

**Demostración:**
Sea $v \in V$ arbitrario. Dado que $\{V_I, L\}$ es una partición de $V$ (Definición 1.1), analizamos ambos casos disjuntos:

* **Caso 1: $v \in L$ (Estado terminal).**
  Cuando $v \in L$, la proposición $v \in V_I$ es falsa, por lo que el lado derecho de la equivalencia se reduce lógicamente a $W(v) = 1$.
  Por otra parte, si $v \in L$, el único vértice en el subárbol $T_v$ es el propio $v$, luego $L_v = \{v\}$. Según la Definición 1.4:
  $$v \in G \iff \exists l \in L_v \text{ tal que } W(l) = 1 \iff W(v) = 1$$
  Así, la equivalencia se cumple cuando $v \in L$.

* **Caso 2: $v \in V_I$ (Estado de decisión interna).**
  Cuando $v \in V_I$, la proposición $v \in L$ es falsa, por lo que el lado derecho de la equivalencia se reduce a $\delta(v, 0) \in G \lor \delta(v, 1) \in G$. Sean $v_0 = \delta(v, 0)$ y $v_1 = \delta(v, 1)$.
  Por el Lema 2.1, el conjunto de hojas alcanzables desde $v$ se descompone como $L_v = L_{v_0} \cup L_{v_1}$. Aplicando la Definición 1.4 y la distributividad del cuantificador existencial sobre la unión de conjuntos:
  $$\begin{aligned}
  v \in G &\iff \exists l \in L_v \, \big(W(l) = 1\big) \\
  &\iff \exists l \in (L_{v_0} \cup L_{v_1}) \, \big(W(l) = 1\big) \\
  &\iff \big(\exists l \in L_{v_0} \, (W(l) = 1)\big) \lor \big(\exists l \in L_{v_1} \, (W(l) = 1)\big) \\
  &\iff (v_0 \in G) \lor (v_1 \in G) \\
  &\iff \delta(v, 0) \in G \lor \delta(v, 1) \in G
  \end{aligned}$$
  Como ambos casos agotan todo el universo $V = V_I \cup L$, la equivalencia queda demostrada para todo $v \in V$. $\blacksquare$

---

### Corolario 3.3 (Oráculo Exacto de Conteo de Rutas Ganadoras)
Para cada vértice $v \in V$, defínase la función de conteo de rutas ganadoras $\eta: V \to \mathbb{N}$ como $\eta(v) = |\{l \in L_v \mid W(l) = 1\}|$. Entonces:
$$\eta(v) = \begin{cases} W(v) & \text{si } v \in L, \\ \eta(\delta(v, 0)) + \eta(\delta(v, 1)) & \text{si } v \in V_I. \end{cases}$$
Además, $v \in G \iff \eta(v) \geq 1$, y el algoritmo recursivo que evalúa $\eta(r)$ tiene complejidad temporal lineal $\mathcal{O}(|V|) = \mathcal{O}(2^h)$.

**Demostración:**
Si $v \in L$, $L_v = \{v\}$ y el conjunto $\{l \in \{v\} \mid W(l) = 1\}$ tiene cardinalidad $1$ si $W(v)=1$ y $0$ si $W(v)=0$, es decir, $\eta(v) = W(v)$. Si $v \in V_I$, por el Lema 2.1 $L_{v_0} \cap L_{v_1} = \emptyset$, luego $\{l \in L_v \mid W(l) = 1\} = \{l \in L_{v_0} \mid W(l) = 1\} \sqcup \{l \in L_{v_1} \mid W(l) = 1\}$. Por el principio de adición de conjuntos disjuntos, $\eta(v) = \eta(v_0) + \eta(v_1)$. Finalmente, cada vértice $v \in V$ es visitado exactamente una vez en el recorrido post-orden, tomando tiempo $\mathcal{O}(1)$ por nodo, lo que da $\mathcal{O}(|V|)$, y por el Teorema 3.1 en un árbol binario de altura $h$ se cumple $|V| \leq 2^{h+1} - 1 \in \mathcal{O}(2^h)$. $\blacksquare$