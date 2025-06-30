import { Card, CardContent, CardFooter } from "@/components/ui/card";

function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <Card>
                <CardContent className="p-4 space-y-2">
                    <h2 className="text-xl font-semibold">📖 Acerca de esta Guía</h2>
                    <p>
                        Esta guía práctica de Git está diseñada para ayudarte a trabajar de manera eficiente en proyectos con múltiples desarrolladores o desde distintos dispositivos personales.
                    </p>
                    <p>
                        Aprenderás a configurar tu entorno Git, trabajar con ramas, colaborar sin conflictos, y mantener buenas prácticas de versionado y sincronización. Ideal para desarrolladores que usan plataformas como GitHub, GitLab o Bitbucket.
                    </p>
                    <p className="text-muted-foreground text-sm">
                        Incluye ejemplos de comandos clave, flujos de trabajo comunes y sugerencias para evitar errores frecuentes en entornos colaborativos.
                    </p>

                </CardContent>
                <CardFooter className="text-sm text-muted-foreground flex justify-between items-center">
                    <p>© 2025. Todos los derechos reservados. <span className="px-3 font-mono text-xs">[g.ilhuicatzi@gmail.com]</span> </p>

                    <span className="ml-2">Hecho con ❤️ por Ilhuicatzi</span>

                </CardFooter>
            </Card>
        </div>

    )
}

export default AboutPage