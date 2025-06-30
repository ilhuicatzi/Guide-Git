// components/GitGuide.tsx
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CodeBlock } from "@/components/ui/code-block" // Asegúrate de tener este componente o usa uno similar

export function GitGuide() {
    return (
        <ScrollArea className="h-[calc(100vh-4rem)] p-4">
            <section className="space-y-6 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold">🛠️ Guía Práctica de Git</h1>
                <p className="text-muted-foreground">Trabajo colaborativo y multidispositivo</p>

                {/* Configuración inicial */}
                <Card>
                    <CardContent className="p-4 space-y-2">
                        <h2 className="text-xl font-semibold">1. 📁 Configuración Inicial</h2>
                        <CodeBlock code={`git config --global user.name "Tu Nombre"\ngit config --global user.email "tuemail@dominio.com"\ngit config --list`} />
                    </CardContent>
                </Card>

                {/* Estructura de ramas */}
                <Card>
                    <CardContent className="p-4 space-y-2">
                        <h2 className="text-xl font-semibold">2. 🧱 Estructura Básica del Repositorio</h2>
                        <ul className="list-disc list-inside space-y-1">
                            <li><code>main</code>: rama estable y desplegable</li>
                            <li><code>dev</code>: rama base para desarrollo</li>
                            <li><code>feature/nombre</code>: para nuevas funcionalidades</li>
                            <li><code>fix/nombre</code>: para corrección de errores</li>
                        </ul>
                    </CardContent>
                </Card>

                {/* Clonar repo */}
                <Card>
                    <CardContent className="p-4 space-y-2">
                        <h2 className="text-xl font-semibold">3. 📦 Clonar un Repositorio</h2>
                        <CodeBlock code={`git clone https://github.com/usuario/repositorio.git\ncd repositorio`} />
                    </CardContent>
                </Card>

                {/* Crear rama */}
                <Card>
                    <CardContent className="p-4 space-y-2">
                        <h2 className="text-xl font-semibold">4. 🌲 Crear y Cambiar de Rama</h2>
                        <CodeBlock code={`git checkout -b feature/login\ngit add .\ngit commit -m "Agrega vista de login"`} />
                    </CardContent>
                </Card>

                {/* Pull y Push */}
                <Card>
                    <CardContent className="p-4 space-y-2">
                        <h2 className="text-xl font-semibold">5. 🔄 Sincronizar con el Repositorio Remoto</h2>
                        <CodeBlock code={`git pull origin main\ngit push origin feature/login`} />
                        <p className="text-sm text-muted-foreground">✔️ Siempre haz <code>pull</code> antes de <code>push</code>.</p>
                    </CardContent>
                </Card>

                {/* Merge */}
                <Card>
                    <CardContent className="p-4 space-y-2">
                        <h2 className="text-xl font-semibold">6. 🔀 Hacer Merge</h2>
                        <CodeBlock code={`git checkout dev\ngit pull origin dev\ngit merge feature/login\ngit push origin dev`} />
                    </CardContent>
                </Card>

                {/* Conflictos */}
                <Card>
                    <CardContent className="p-4 space-y-2">
                        <h2 className="text-xl font-semibold">7. 📍 Resolución de Conflictos</h2>
                        <CodeBlock
                            code={`<<<<<<< HEAD\ncódigo tuyo\n=======\ncódigo del otro\n>>>>>>> feature/otro`}
                        />
                        <CodeBlock code={`git add archivo.js\ngit commit -m "Resuelve conflicto"`} />
                    </CardContent>
                </Card>

                {/* Otro dispositivo */}
                <Card>
                    <CardContent className="p-4 space-y-2">
                        <h2 className="text-xl font-semibold">8. 🖥️ Otro Dispositivo</h2>
                        <p>Clona el repo y cambia a la rama deseada:</p>
                        <CodeBlock code={`git checkout feature/login\ngit pull origin feature/login`} />
                    </CardContent>
                </Card>

                {/* Buenas prácticas */}
                <Card>
                    <CardContent className="p-4 space-y-2">
                        <h2 className="text-xl font-semibold">9. 🧽 Buenas Prácticas</h2>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Commits pequeños y claros</li>
                            <li>Usa <code>.gitignore</code> para evitar archivos innecesarios</li>
                            <li>Revisa con <code>git status</code> y <code>git diff</code></li>
                        </ul>
                    </CardContent>
                </Card>

                {/* Casos comunes */}
                <Card>
                    <CardContent className="p-4 space-y-2">
                        <h2 className="text-xl font-semibold">10. 🚨 Casos Comunes</h2>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li><strong>Otro equipo:</strong> <code>git pull origin rama</code></li>
                            <li><strong>Merge completado:</strong> borra tu rama local</li>
                            <li><strong>Nuevo dispositivo:</strong> clona y haz <code>checkout</code></li>
                            <li><strong>Desactualizado:</strong> <code>git pull origin main</code></li>
                        </ul>
                    </CardContent>
                </Card>

                {/* Comandos útiles */}
                <Card>
                    <CardContent className="p-4 space-y-2">
                        <h2 className="text-xl font-semibold">11. 📚 Comandos Útiles</h2>
                        <CodeBlock
                            code={`git branch\ngit checkout rama\ngit checkout -b nueva-rama\ngit push -u origin rama\ngit fetch\ngit stash\ngit stash pop`}
                        />
                    </CardContent>
                </Card>

                {/* Plataformas */}
                <Card>
                    <CardContent className="p-4 space-y-2">
                        <h2 className="text-xl font-semibold">12. 🌐 Plataformas para Repositorio Remoto</h2>
                        <ul className="list-disc list-inside space-y-1">
                            <li><strong>GitHub</strong> (recomendado)</li>
                            <li>GitLab</li>
                            <li>Bitbucket</li>
                        </ul>
                        <p className="text-sm text-muted-foreground">🛡️ Te puedo ayudar a configurar claves SSH para evitar ingresar contraseña cada vez.</p>
                    </CardContent>
                </Card>
            </section>
        </ScrollArea>
    )
}
