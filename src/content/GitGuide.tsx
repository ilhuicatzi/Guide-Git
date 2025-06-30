// components/GitGuide.tsx
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CodeBlock } from "@/components/ui/code-block" // Asegúrate de tener este componente o usa uno similar

// ... (imports existentes)

export function GitGuide() {
    return (
        <ScrollArea className="h-[calc(100vh-4rem)] p-4">
            <section className="space-y-6 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold">🛠️ Guía Práctica de Git</h1>
                <p className="text-muted-foreground">
                    Git es la herramienta fundamental para el control de versiones, permitiéndote rastrear cambios, colaborar eficientemente en equipos y mantener un historial robusto de tu código. Esta guía te proporcionará los comandos esenciales para empezar a usar Git en proyectos colaborativos y en múltiples dispositivos.
                </p>

                {/* Configuración inicial */}
                <Card>
                    <CardContent className="p-4 space-y-2">
                        <h2 className="text-xl font-semibold">1. 📁 Configuración Inicial</h2>
                        <p className="text-sm text-muted-foreground">Establece tu identidad para que tus commits se asocien correctamente contigo. La opción `--global` aplica estos ajustes a todos tus repositorios.</p>
                        <CodeBlock code={`git config --global user.name "Tu Nombre"\ngit config --global user.email "tuemail@dominio.com"\ngit config --list`} />
                    </CardContent>
                </Card>

                {/* Estructura de ramas */}
                <Card>
                    <CardContent className="p-4 space-y-2">
                        <h2 className="text-xl font-semibold">2. 🧱 Estrategia de Ramas</h2>
                        <p className="text-sm text-muted-foreground">Una estrategia de ramificación ayuda a organizar el desarrollo. Esta es una convención común inspirada en flujos de trabajo como Git Flow o GitHub Flow:</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li><code>main</code>: Rama principal y estable, lista para producción.</li>
                            <li><code>dev</code>: Rama base para la integración de nuevas funcionalidades.</li>
                            <li><code>feature/nombre-de-la-funcionalidad</code>: Ramas para desarrollar nuevas características.</li>
                            <li><code>fix/descripcion-del-error</code>: Ramas para corregir errores específicos.</li>
                        </ul>
                    </CardContent>
                </Card>

                {/* Clonar repo */}
                <Card>
                    <CardContent className="p-4 space-y-2">
                        <h2 className="text-xl font-semibold">3. 📦 Clonar un Repositorio</h2>
                        <p className="text-sm text-muted-foreground">Descarga una copia completa de un repositorio remoto a tu máquina local.</p>
                        <CodeBlock code={`git clone https://github.com/usuario/repositorio.git\ncd repositorio`} />
                    </CardContent>
                </Card>

                {/* Ciclo de trabajo diario */}
                <Card>
                    <CardContent className="p-4 space-y-2">
                        <h2 className="text-xl font-semibold">4. 🔄 Ciclo de Trabajo Diario: Cambios, Commits y Push</h2>
                        <p className="text-sm text-muted-foreground">Este es el proceso fundamental para guardar y compartir tus avances.</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li><strong>Verificar el estado:</strong> <code>git status</code> (ve qué archivos se han modificado o añadido).</li>
                            <li><strong>Preparar cambios:</strong> <code>git add .</code> (añade todos los archivos modificados o nuevos al área de preparación). Usa <code>git add nombre-del-archivo.js</code> para archivos específicos.</li>
                            <li><strong>Guardar cambios localmente:</strong> <code>git commit -m "Mensaje descriptivo de tu cambio"</code> (crea un punto en el historial).</li>
                            <li><strong>Sincronizar con el remoto:</strong> Antes de subir tus cambios, siempre actualiza tu rama local con los cambios remotos para evitar conflictos.
                                <CodeBlock code={`git pull origin <nombre-de-tu-rama>`} />
                                <CodeBlock code={`git push origin <nombre-de-tu-rama>`} />
                                <p className="text-sm text-muted-foreground">✔️ Siempre haz <code>pull</code> antes de <code>push</code>. Usa <code>git push -u origin &lt;rama&gt;</code> la primera vez para establecer el seguimiento.</p>
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                {/* Crear rama */}
                <Card>
                    <CardContent className="p-4 space-y-2">
                        <h2 className="text-xl font-semibold">5. 🌲 Crear y Cambiar de Rama</h2>
                        <p className="text-sm text-muted-foreground">Trabaja en nuevas funcionalidades o correcciones de forma aislada.</p>
                        <CodeBlock code={`git checkout -b feature/login // Crea y cambia a una nueva rama\n// ... haz tus cambios ...\ngit add .\ngit commit -m "Agrega vista de login"`} />
                    </CardContent>
                </Card>

                {/* Merge */}
                <Card>
                    <CardContent className="p-4 space-y-2">
                        <h2 className="text-xl font-semibold">6. 🔀 Integrar Cambios (Merge)</h2>
                        <p className="text-sm text-muted-foreground">Combina los cambios de una rama en otra, usualmente de una rama de funcionalidad a <code>dev</code>.</p>
                        <CodeBlock code={`git checkout dev // Cambia a la rama donde quieres integrar\ngit pull origin dev // Asegúrate de que 'dev' esté actualizada\ngit merge feature/login // Fusiona los cambios de 'feature/login' en 'dev'\ngit push origin dev // Sube los cambios fusionados a 'dev' en el remoto`} />
                    </CardContent>
                </Card>

                {/* Conflictos */}
                <Card>
                    <CardContent className="p-4 space-y-2">
                        <h2 className="text-xl font-semibold">7. 📍 Resolución de Conflictos</h2>
                        <p className="text-sm text-muted-foreground">Ocurre cuando Git no puede decidir automáticamente qué versión de un código mantener. Git marcará las secciones conflictivas en el archivo.</p>
                        <CodeBlock
                            code={`<<<<<<< HEAD\ncódigo tuyo\n=======\ncódigo del otro\n>>>>>>> feature/otro`}
                        />
                        <p className="text-sm text-muted-foreground"><strong>Pasos para resolver:</strong></p>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                            <li>Edita el archivo manualmente para elegir el código correcto y elimina las marcas (<code>&lt;&lt;&lt;&lt;&lt;&lt;</code>, <code>=======</code>, <code>&gt;&gt;&gt;&gt;&gt;&gt;</code>).</li>
                            <li>Marca el archivo como resuelto: <code>git add archivo.js</code></li>
                            <li>Crea un commit para registrar la resolución: <code>git commit -m "Resuelve conflicto en archivo.js"</code></li>
                        </ol>
                    </CardContent>
                </Card>

                {/* Otro dispositivo */}
                <Card>
                    <CardContent className="p-4 space-y-2">
                        <h2 className="text-xl font-semibold">8. 🖥️ Trabajar en Otro Dispositivo</h2>
                        <p className="text-sm text-muted-foreground">Para continuar tu trabajo en otra computadora, simplemente clona el repositorio o cambia a tu rama existente y actualízala.</p>
                        <CodeBlock code={`git clone https://github.com/usuario/repositorio.git\ncd repositorio\ngit checkout feature/login\ngit pull origin feature/login`} />
                        <p className="text-sm text-muted-foreground">Una vez que hayas terminado tu sesión, haz <code>git push origin feature/login</code> para guardar tus cambios en el remoto.</p>
                    </CardContent>
                </Card>

                {/* Buenas prácticas */}
                <Card>
                    <CardContent className="p-4 space-y-2">
                        <h2 className="text-xl font-semibold">9. 🧽 Buenas Prácticas y Consejos</h2>
                        <ul className="list-disc list-inside space-y-1">
                            <li><strong>Commits pequeños y claros:</strong> Cada commit debe ser una unidad lógica de trabajo.</li>
                            <li><strong>Usa <code>.gitignore</code>:</strong> Crea este archivo para evitar que Git rastree archivos innecesarios (e.g., <code>node_modules/</code>, archivos de log).</li>
                            <li><strong>Revisa tus cambios:</strong> Siempre usa <code>git status</code> para ver el estado de tu repositorio y <code>git diff</code> para ver los cambios exactos antes de hacer un commit.</li>
                            <li><strong>Comunica los cambios:</strong> Especialmente en equipos, informa sobre los cambios importantes o fusiones.</li>
                        </ul>
                    </CardContent>
                </Card>

                {/* Casos comunes */}
                <Card>
                    <CardContent className="p-4 space-y-2">
                        <h2 className="text-xl font-semibold">10. 🚨 Casos y Soluciones Rápidas</h2>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li><strong>Obtener últimos cambios del equipo en tu rama:</strong> <code>git pull origin tu-rama-actual</code></li>
                            <li><strong>Borrar tu rama local después de un merge exitoso:</strong> <code>git branch -d feature/nombre-de-la-funcionalidad</code> (solo si ya se fusionó)</li>
                            <li><strong>Si tu rama está desactualizada con <code>main</code>:</strong> <code>git pull origin main</code> (estando en tu rama de trabajo). Esto fusionará los cambios de `main` en tu rama.</li>
                            <li><strong>Necesitas guardar cambios temporalmente sin commitear:</strong> <code>git stash</code> (guarda tus cambios) y luego <code>git stash pop</code> (los recupera).</li>
                            <li><strong>¿Cómo se ve el historial?</strong> <code>git log</code></li>
                            <li><strong>Deshacer un commit (con precaución):</strong> <code>git revert &lt;commit-hash&gt;</code> (crea un nuevo commit que deshace el anterior). Evita <code>git reset --hard</code> a menos que sepas exactamente lo que haces.</li>
                        </ul>
                    </CardContent>
                </Card>

                {/* Plataformas */}
                <Card>
                    <CardContent className="p-4 space-y-2">
                        <h2 className="text-xl font-semibold">11. 🌐 Plataformas para Repositorio Remoto</h2>
                        <p className="text-sm text-muted-foreground">Servicios populares para alojar tus repositorios de Git y facilitar la colaboración:</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li><strong>GitHub</strong> (recomendado): Ideal para proyectos de código abierto y privados.</li>
                            <li>GitLab: Ofrece más funcionalidades de CI/CD integradas.</li>
                            <li>Bitbucket: Popular para equipos que usan Jira.</li>
                        </ul>
                        <p className="text-sm text-muted-foreground">🛡️ Te puedo ayudar a configurar claves SSH para evitar ingresar contraseña cada vez. ¡Es una mejora de seguridad y conveniencia!</p>
                    </CardContent>
                </Card>
            </section>
        </ScrollArea>
    )
}
