import { Card, CardContent } from "@/components/ui/card";

function AboutPage() {
    return (
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
        </Card>

    )
}

export default AboutPage