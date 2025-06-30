"use client";

import { useState, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Copy,
    Check,
    ChevronDown,
    ChevronRight,
    GitBranch,
    Terminal,
    Users,
    Zap,
    LucideIcon,
    Lightbulb,
    AlertTriangle,
    CheckCircle,
    AlertCircle,
    Github,
    GitMerge,
    Code2,
    Rocket
} from "lucide-react";
import { cn } from "@/lib/utils";

// Interfaces para tipado
interface CodeBlockProps {
    code: string;
    language?: string;
    fileName?: string;
}

interface CollapsibleSectionProps {
    title: string;
    children: ReactNode;
    icon: LucideIcon;
    defaultOpen?: boolean;
}

type TipBoxType = "info" | "warning" | "success" | "danger";

interface TipBoxProps {
    type?: TipBoxType;
    children: ReactNode;
    title?: string;
}

// Componente mejorado para bloques de código
const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = "bash", fileName }) => {
    const [copied, setCopied] = useState<boolean>(false);

    const copyToClipboard = async (): Promise<void> => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Error al copiar al portapapeles:', error);
        }
    };

    return (
        <Card className="overflow-hidden border-0 shadow-lg">
            <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b">
                <div className="flex items-center gap-2">
                    {fileName && (
                        <span className="text-xs font-medium text-muted-foreground">{fileName}</span>
                    )}
                    <Badge variant="secondary" className="text-xs">
                        {language}
                    </Badge>
                </div>
                <Button
                    onClick={copyToClipboard}
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-xs"
                >
                    {copied ? (
                        <>
                            <Check className="mr-1 h-3 w-3" />
                            Copiado
                        </>
                    ) : (
                        <>
                            <Copy className="mr-1 h-3 w-3" />
                            Copiar
                        </>
                    )}
                </Button>
            </div>
            <div className="relative">
                <pre className="p-4 text-sm overflow-x-auto bg-muted/20">
                    <code className="text-foreground">{code}</code>
                </pre>
            </div>
        </Card>
    );
};

// Componente mejorado para secciones colapsables
const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
    title,
    children,
    icon: Icon,
    defaultOpen = false
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

    return (
        <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary">
            <CardHeader
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="flex-1 text-xl">{title}</CardTitle>
                    <Button variant="ghost" size="sm" className="p-1">
                        {isOpen ? (
                            <ChevronDown className="h-4 w-4" />
                        ) : (
                            <ChevronRight className="h-4 w-4" />
                        )}
                    </Button>
                </div>
            </CardHeader>

            {isOpen && (
                <CardContent className="space-y-6 pt-0 animate-in slide-in-from-top-2 duration-300">
                    {children}
                </CardContent>
            )}
        </Card>
    );
};

// Componente mejorado para cajas de consejo
const TipBox: React.FC<TipBoxProps> = ({ type = "info", children, title }) => {
    const configs = {
        info: {
            icon: Lightbulb,
            className: "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50",
            iconClassName: "text-blue-600 dark:text-blue-400",
            titleClassName: "text-blue-800 dark:text-blue-300"
        },
        warning: {
            icon: AlertTriangle,
            className: "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/50",
            iconClassName: "text-yellow-600 dark:text-yellow-400",
            titleClassName: "text-yellow-800 dark:text-yellow-300"
        },
        success: {
            icon: CheckCircle,
            className: "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/50",
            iconClassName: "text-green-600 dark:text-green-400",
            titleClassName: "text-green-800 dark:text-green-300"
        },
        danger: {
            icon: AlertCircle,
            className: "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/50",
            iconClassName: "text-red-600 dark:text-red-400",
            titleClassName: "text-red-800 dark:text-red-300"
        }
    };

    const config = configs[type];
    const IconComponent = config.icon;

    return (
        <Card className={cn("border-l-4", config.className)}>
            <CardContent className="p-4">
                <div className="flex gap-3">
                    <IconComponent className={cn("h-5 w-5 mt-0.5 flex-shrink-0", config.iconClassName)} />
                    <div className="flex-1 space-y-2">
                        {title && (
                            <h4 className={cn("font-semibold", config.titleClassName)}>
                                {title}
                            </h4>
                        )}
                        <div className="text-sm text-muted-foreground">
                            {children}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

// Componente para tarjetas de rama
const BranchCard: React.FC<{
    title: string;
    branches: Array<{ name: string; description: string }>;
    variant: "primary" | "secondary";
}> = ({ title, branches, variant }) => {
    const isSecondary = variant === "secondary";

    return (
        <Card className={cn(
            "border-l-4 transition-all hover:shadow-md",
            isSecondary
                ? "border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20"
                : "border-l-green-500 bg-green-50/50 dark:bg-green-950/20"
        )}>
            <CardContent className="p-4">
                <h3 className={cn(
                    "font-semibold mb-3 flex items-center gap-2",
                    isSecondary ? "text-blue-800 dark:text-blue-300" : "text-green-800 dark:text-green-300"
                )}>
                    <GitBranch className="h-4 w-4" />
                    {title}
                </h3>
                <div className="space-y-2">
                    {branches.map((branch, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <Badge
                                variant="secondary"
                                className={cn(
                                    "font-mono text-xs",
                                    isSecondary
                                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                )}
                            >
                                {branch.name}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{branch.description}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export const GitGuide: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
            <div className="container mx-auto px-4 py-12 max-w-6xl">
                {/* Header mejorado */}
                <div className="text-center mb-16 space-y-6">
                    <div className="flex justify-center items-center gap-4 mb-6">
                        <div className="p-3 rounded-2xl bg-primary/10 ring-8 ring-primary/5">
                            <GitBranch className="h-12 w-12 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                                Guía Completa de Git
                            </h1>
                            <div className="flex items-center justify-center gap-2 mt-2">
                                <Badge variant="outline" className="text-xs">
                                    v2024
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                    Actualizada
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                        Domina el control de versiones más popular del mundo. Desde configuración básica
                        hasta flujos de trabajo avanzados para equipos profesionales.
                    </p>

                    <div className="flex flex-wrap justify-center gap-3 mt-8">
                        <Badge variant="secondary" className="px-4 py-2 text-sm">
                            <Terminal className="mr-2 h-4 w-4" />
                            Comandos Esenciales
                        </Badge>
                        <Badge variant="secondary" className="px-4 py-2 text-sm">
                            <Users className="mr-2 h-4 w-4" />
                            Trabajo en Equipo
                        </Badge>
                        <Badge variant="secondary" className="px-4 py-2 text-sm">
                            <Zap className="mr-2 h-4 w-4" />
                            Buenas Prácticas
                        </Badge>
                        <Badge variant="secondary" className="px-4 py-2 text-sm">
                            <Github className="mr-2 h-4 w-4" />
                            GitHub Ready
                        </Badge>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Configuración inicial */}
                    <CollapsibleSection title="Configuración Inicial" icon={Terminal} defaultOpen={true}>
                        <div className="space-y-6">
                            <p className="text-muted-foreground">
                                Antes de comenzar, configura tu identidad en Git. Esta información aparecerá en todos tus commits.
                            </p>

                            <CodeBlock
                                language="bash"
                                code={`# Configurar nombre y email globalmente
git config --global user.name "Tu Nombre Completo"
git config --global user.email "tu.email@dominio.com"

# Verificar configuración
git config --list

# Configurar editor por defecto (opcional)
git config --global core.editor "code --wait"

# Configurar rama por defecto
git config --global init.defaultBranch main`}
                            />

                            <TipBox type="info" title="Consejo Pro">
                                Usa la misma dirección de email que tienes registrada en GitHub/GitLab para que tus
                                contribuciones se vinculen correctamente a tu perfil y aparezcan en tu gráfico de actividad.
                            </TipBox>
                        </div>
                    </CollapsibleSection>

                    {/* Estrategia de ramas */}
                    <CollapsibleSection title="Estrategia de Ramas" icon={GitBranch}>
                        <div className="space-y-6">
                            <p className="text-muted-foreground">
                                Una buena estrategia de ramificación es fundamental para mantener un proyecto organizado
                                y facilitar la colaboración efectiva entre desarrolladores.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6">
                                <BranchCard
                                    title="Ramas Principales"
                                    variant="primary"
                                    branches={[
                                        { name: "main", description: "Código estable en producción" },
                                        { name: "develop", description: "Integración de nuevas características" }
                                    ]}
                                />
                                <BranchCard
                                    title="Ramas de Trabajo"
                                    variant="secondary"
                                    branches={[
                                        { name: "feature/login-system", description: "Nuevas funcionalidades" },
                                        { name: "hotfix/security-patch", description: "Correcciones urgentes" },
                                        { name: "bugfix/navbar-responsive", description: "Corrección de errores" }
                                    ]}
                                />
                            </div>

                            <CodeBlock
                                language="bash"
                                code={`# Crear y cambiar a una nueva rama
git checkout -b feature/nueva-funcionalidad

# Comando moderno equivalente
git switch -c feature/nueva-funcionalidad

# Listar todas las ramas (locales y remotas)
git branch -a

# Cambiar entre ramas
git checkout develop
git switch main  # comando moderno recomendado

# Eliminar rama local
git branch -d feature/completada

# Eliminar rama remota
git push origin --delete feature/completada`}
                            />
                        </div>
                    </CollapsibleSection>

                    {/* Flujo de trabajo diario */}
                    <CollapsibleSection title="Flujo de Trabajo Diario" icon={Zap}>
                        <div className="space-y-8">
                            <p className="text-muted-foreground">
                                El ciclo básico que seguirás día a día al trabajar con Git. Dominar este flujo
                                te hará más eficiente y reducirá los errores comunes.
                            </p>

                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                                            1
                                        </div>
                                        <h3 className="text-lg font-semibold">Verificar Estado del Repositorio</h3>
                                    </div>
                                    <CodeBlock
                                        language="bash"
                                        code={`# Ver estado actual con detalles
git status

# Ver cambios específicos
git diff

# Ver cambios en staging area
git diff --staged

# Ver historial elegante
git log --oneline --graph --decorate --all

# Ver últimos 5 commits
git log --oneline -5`}
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                                            2
                                        </div>
                                        <h3 className="text-lg font-semibold">Preparar y Confirmar Cambios</h3>
                                    </div>
                                    <CodeBlock
                                        language="bash"
                                        code={`# Añadir archivos específicos
git add src/components/Header.tsx
git add src/styles/globals.css

# Añadir por patrones
git add "*.tsx"
git add src/

# Añadir todos los cambios
git add .

# Commit con mensaje descriptivo siguiendo Conventional Commits
git commit -m "feat(auth): implementa sistema de autenticación

- Añade componente de formulario de login
- Configura validación con zod
- Implementa manejo de sesiones con NextAuth
- Añade middleware de protección de rutas

Closes #123"`}
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                                            3
                                        </div>
                                        <h3 className="text-lg font-semibold">Sincronizar con el Repositorio Remoto</h3>
                                    </div>
                                    <CodeBlock
                                        language="bash"
                                        code={`# Actualizar rama local con cambios remotos
git pull origin feature/mi-rama

# Alternativa más segura (fetch + merge)
git fetch origin
git merge origin/feature/mi-rama

# Subir cambios al repositorio remoto
git push origin feature/mi-rama

# Primera vez: establecer seguimiento upstream
git push -u origin feature/mi-rama

# Después solo necesitas
git push`}
                                    />
                                </div>
                            </div>

                            <TipBox type="warning" title="Regla de Oro">
                                Siempre haz <code className="bg-muted px-1 py-0.5 rounded text-sm">git pull</code> antes de <code className="bg-muted px-1 py-0.5 rounded text-sm">git push</code> para evitar conflictos y mantener un historial limpio. Considera usar <code className="bg-muted px-1 py-0.5 rounded text-sm">git pull --rebase</code> para un historial más lineal.
                            </TipBox>
                        </div>
                    </CollapsibleSection>

                    {/* Resolución de conflictos */}
                    <CollapsibleSection title="Resolución de Conflictos" icon={GitMerge}>
                        <div className="space-y-6">
                            <p className="text-muted-foreground">
                                Los conflictos son normales en el desarrollo colaborativo. Aquí aprenderás a identificarlos,
                                entenderlos y resolverlos de manera eficiente.
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <Code2 className="h-5 w-5" />
                                        Anatomía de un Conflicto
                                    </h3>
                                    <CodeBlock
                                        language="typescript"
                                        fileName="components/Header.tsx"
                                        code={`// components/Header.tsx
export function Header() {
<<<<<<< HEAD (Current Change)
  return (
    <header className="bg-blue-600 text-white">
      <h1>Mi App - Versión Main</h1>
    </header>
  );
=======
  return (
    <header className="bg-green-600 text-white">
      <h1>Mi App - Nueva Feature</h1>
    </header>
  );
>>>>>>> feature/new-design (Incoming Change)
}`}
                                    />
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Pasos para Resolver Conflictos</h3>
                                    <CodeBlock
                                        language="bash"
                                        code={`# 1. Identificar archivos con conflictos
git status

# 2. Abrir archivos y resolver manualmente
# - Eliminar marcadores <<<<<<, ======, >>>>>>
# - Elegir la versión correcta o combinar ambas
# - Guardar el archivo

# 3. Marcar archivos como resueltos
git add components/Header.tsx

# 4. Verificar que todos los conflictos están resueltos
git status

# 5. Completar el merge
git commit -m "resolve: conflicto en Header component

Combina estilos de main y feature/new-design
Mantiene funcionalidad de ambas ramas"`}
                                    />
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Ejemplo de Resolución Manual</h3>
                                    <CodeBlock
                                        language="typescript"
                                        fileName="components/Header.tsx (resuelto)"
                                        code={`// components/Header.tsx - Conflicto resuelto
export function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
      <h1>Mi App - Versión Mejorada</h1>
      <nav>
        {/* Navegación combinada de ambas ramas */}
      </nav>
    </header>
  );
}`}
                                    />
                                </div>
                            </div>

                            <TipBox type="success" title="Herramientas Útiles">
                                <div className="space-y-2">
                                    <p>Usa editores modernos que facilitan la resolución:</p>
                                    <ul className="list-disc list-inside space-y-1 text-sm">
                                        <li><strong>VS Code:</strong> Resalta conflictos y ofrece botones &quot;Accept Current&quot;, &quot;Accept Incoming&quot;, &quot;Accept Both&quot;</li>
                                        <li><strong>Git Mergetool:</strong> <code className="bg-muted px-1 py-0.5 rounded">git mergetool</code> para herramientas visuales</li>
                                        <li><strong>GitHub Desktop:</strong> Interfaz visual intuitiva para resolución de conflictos</li>
                                    </ul>
                                </div>
                            </TipBox>
                        </div>
                    </CollapsibleSection>

                    {/* Comandos avanzados */}
                    <CollapsibleSection title="Comandos Avanzados y Casos Especiales" icon={Terminal}>
                        <div className="grid lg:grid-cols-2 gap-8">
                            <Card className="p-6">
                                <h3 className="font-semibold mb-4 flex items-center gap-2">
                                    <GitBranch className="h-5 w-5 text-primary" />
                                    Reescribir Historia
                                </h3>
                                <CodeBlock
                                    language="bash"
                                    code={`# Cambiar último commit
git commit --amend -m "Nuevo mensaje"

# Rebase interactivo (últimos 3 commits)
git rebase -i HEAD~3

# Combinar commits (squash)
# En el editor, cambiar 'pick' por 'squash'

# Rebase sobre rama principal
git rebase main`}
                                />
                            </Card>

                            <Card className="p-6">
                                <h3 className="font-semibold mb-4 flex items-center gap-2">
                                    <Copy className="h-5 w-5 text-primary" />
                                    Guardado Temporal
                                </h3>
                                <CodeBlock
                                    language="bash"
                                    code={`# Guardar cambios temporalmente
git stash push -m "WIP: navbar responsive"

# Ver lista de stashes
git stash list

# Recuperar último stash
git stash pop

# Aplicar stash específico
git stash apply stash@{1}

# Crear rama desde stash
git stash branch nueva-rama stash@{0}`}
                                />
                            </Card>

                            <Card className="p-6">
                                <h3 className="font-semibold mb-4 flex items-center gap-2">
                                    <Github className="h-5 w-5 text-primary" />
                                    Trabajo Remoto
                                </h3>
                                <CodeBlock
                                    language="bash"
                                    code={`# Añadir repositorio remoto
git remote add origin https://github.com/user/repo.git

# Ver remotos configurados
git remote -v

# Sincronizar con múltiples remotos
git fetch --all

# Hacer push a remoto específico
git push upstream main

# Cambiar URL remota
git remote set-url origin git@github.com:user/repo.git`}
                                />
                            </Card>

                            <Card className="p-6">
                                <h3 className="font-semibold mb-4 flex items-center gap-2">
                                    <Zap className="h-5 w-5 text-primary" />
                                    Investigación y Debug
                                </h3>
                                <CodeBlock
                                    language="bash"
                                    code={`# Buscar en el código
git grep "función" -- "*.ts" "*.tsx"

# Ver quien cambió cada línea
git blame components/Header.tsx

# Buscar commit que introdujo un bug
git bisect start
git bisect bad HEAD
git bisect good v1.0.0

# Ver diferencias entre ramas
git diff main..feature/nueva-funcionalidad`}
                                />
                            </Card>
                        </div>
                    </CollapsibleSection>

                    {/* Buenas prácticas */}
                    <CollapsibleSection title="Buenas Prácticas y Convenciones" icon={CheckCircle}>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <Code2 className="h-5 w-5" />
                                    Conventional Commits
                                </h3>
                                <p className="text-muted-foreground mb-4">
                                    Usa este formato estándar para mantener un historial claro y generar changelogs automáticamente:
                                </p>
                                <CodeBlock
                                    language="bash"
                                    code={`# Formato: tipo(scope): descripción

# Tipos principales:
feat(auth): implementa login con Google OAuth
fix(ui): corrige responsividad en dispositivos móviles  
docs(readme): actualiza guía de instalación
style(components): mejora espaciado en Header
refactor(api): simplifica manejo de errores HTTP
test(auth): añade pruebas unitarias para validación
chore(deps): actualiza Next.js a v14
perf(images): optimiza carga de imágenes con next/image
ci(actions): configura deployment automático

# Con breaking changes:
feat(api)!: cambia estructura de respuesta JSON

BREAKING CHANGE: La API ahora retorna datos en formato v2`}
                                />
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-4">Archivo .gitignore para Next.js</h3>
                                <CodeBlock
                                    language="gitignore"
                                    fileName=".gitignore"
                                    code={`# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Next.js
.next/
out/
build/
dist/

# Production
.vercel/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# TypeScript
*.tsbuildinfo

# Optional npm cache directory
.npm

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/`}
                                />
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-4">Configuración SSH (Recomendada)</h3>
                                <CodeBlock
                                    language="bash"
                                    code={`# Generar clave SSH moderna
ssh-keygen -t ed25519 -C "tu.email@dominio.com"

# Si tu sistema no soporta ed25519, usa RSA
ssh-keygen -t rsa -b 4096 -C "tu.email@dominio.com"

# Añadir clave al ssh-agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Copiar clave pública (Linux/Mac)
cat ~/.ssh/id_ed25519.pub | pbcopy

# Copiar clave pública (Windows)
clip < ~/.ssh/id_ed25519.pub

# Probar conexión con GitHub
ssh -T git@github.com`}
                                />
                            </div>

                            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                                <CardContent className="p-6">
                                    <h4 className="font-semibold text-primary mb-4 flex items-center gap-2">
                                        <Rocket className="h-5 w-5" />
                                        Consejos de Oro para Desarrolladores
                                    </h4>
                                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                                        <ul className="space-y-2">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                <span>Haz commits pequeños y frecuentes con propósito específico</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                <span>Revisa cambios con <code>git diff --staged</code> antes de commit</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                <span>Mantén las ramas actualizadas con <code>git pull origin main</code></span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                <span>Usa Pull Requests para revisión de código en equipo</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                <span>Nunca hagas <code>git push --force</code> en ramas compartidas</span>
                                            </li>
                                        </ul>
                                        <ul className="space-y-2">
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                <span>Escribe mensajes descriptivos que expliquen el &quot;por qué&quot;</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                <span>Usa <code>git stash</code> para cambios temporales</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                <span>Configura aliases para comandos frecuentes</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                <span>Aprende a usar <code>git rebase -i</code> para limpiar historial</span>
                                            </li>
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>

                            <div>
                                <h3 className="text-lg font-semibold mb-4">Aliases Útiles</h3>
                                <CodeBlock
                                    language="bash"
                                    code={`# Configurar aliases útiles
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"

# Usar aliases
git st          # git status
git co main     # git checkout main
git lg          # log bonito con colores`}
                                />
                            </div>
                        </div>
                    </CollapsibleSection>

                    {/* Workflows específicos */}
                    <CollapsibleSection title="Workflows Avanzados para Equipos" icon={Users}>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-semibold mb-4">GitHub Flow (Recomendado para Next.js)</h3>
                                <div className="space-y-4">
                                    <div className="grid md:grid-cols-4 gap-4">
                                        <Card className="p-4 text-center">
                                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-2">
                                                <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
                                            </div>
                                            <h4 className="font-semibold text-sm">Crear rama</h4>
                                            <p className="text-xs text-muted-foreground mt-1">feature/nueva-funcionalidad</p>
                                        </Card>
                                        <Card className="p-4 text-center">
                                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-2">
                                                <span className="text-green-600 dark:text-green-400 font-bold">2</span>
                                            </div>
                                            <h4 className="font-semibold text-sm">Desarrollar</h4>
                                            <p className="text-xs text-muted-foreground mt-1">Commits frecuentes</p>
                                        </Card>
                                        <Card className="p-4 text-center">
                                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-2">
                                                <span className="text-purple-600 dark:text-purple-400 font-bold">3</span>
                                            </div>
                                            <h4 className="font-semibold text-sm">Pull Request</h4>
                                            <p className="text-xs text-muted-foreground mt-1">Revisión de código</p>
                                        </Card>
                                        <Card className="p-4 text-center">
                                            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-2">
                                                <span className="text-orange-600 dark:text-orange-400 font-bold">4</span>
                                            </div>
                                            <h4 className="font-semibold text-sm">Deploy</h4>
                                            <p className="text-xs text-muted-foreground mt-1">Merge a main</p>
                                        </Card>
                                    </div>

                                    <CodeBlock
                                        language="bash"
                                        code={`# Workflow completo
# 1. Crear y cambiar a nueva rama
git checkout main
git pull origin main
git checkout -b feature/user-dashboard

# 2. Desarrollar la funcionalidad
# ... hacer cambios ...
git add .
git commit -m "feat(dashboard): add user statistics component"

# 3. Subir rama y crear PR
git push -u origin feature/user-dashboard
# Crear Pull Request en GitHub

# 4. Después de aprobación, merge y limpieza
git checkout main
git pull origin main
git branch -d feature/user-dashboard`}
                                    />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-4">Hotfix Workflow</h3>
                                <CodeBlock
                                    language="bash"
                                    code={`# Para correcciones urgentes en producción
# 1. Crear hotfix desde main
git checkout main
git pull origin main
git checkout -b hotfix/fix-payment-bug

# 2. Hacer la corrección
git add .
git commit -m "fix(payment): resolve null pointer in checkout process

- Add null check for payment method
- Update error handling
- Add fallback for failed transactions

Fixes #456"

# 3. Crear PR de emergencia
git push -u origin hotfix/fix-payment-bug

# 4. Después del merge, actualizar develop también
git checkout develop
git pull origin develop
git merge main`}
                                />
                            </div>
                        </div>
                    </CollapsibleSection>

                    {/* Integración con Next.js */}
                    <CollapsibleSection title="Integración con Next.js y Vercel" icon={Rocket}>
                        <div className="space-y-6">
                            <p className="text-muted-foreground">
                                Configuración específica para proyectos Next.js con deployment en Vercel y buenas prácticas.
                            </p>

                            <div>
                                <h3 className="text-lg font-semibold mb-4">Configuración de Vercel</h3>
                                <CodeBlock
                                    language="json"
                                    fileName="vercel.json"
                                    code={`{
  "git": {
    "deploymentEnabled": {
      "main": true,
      "develop": false
    }
  },
  "github": {
    "autoAlias": false,
    "autoJobCancelation": true
  },
  "builds": [
    {
      "src": "next.config.js",
      "use": "@vercel/next"
    }
  ]
}`}
                                />
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-4">Hooks de Git para Next.js</h3>
                                <CodeBlock
                                    language="bash"
                                    fileName=".git/hooks/pre-commit"
                                    code={`#!/bin/sh
# Pre-commit hook para Next.js

# Ejecutar linting
npm run lint
if [ $? -ne 0 ]; then
  echo "❌ Lint failed. Please fix errors before committing."
  exit 1
fi

# Ejecutar tests
npm run test
if [ $? -ne 0 ]; then
  echo "❌ Tests failed. Please fix tests before committing."
  exit 1
fi

# Verificar build
npm run build
if [ $? -ne 0 ]; then
  echo "❌ Build failed. Please fix build errors before committing."
  exit 1
fi

echo "✅ All checks passed!"`}
                                />
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-4">GitHub Actions para Next.js</h3>
                                <CodeBlock
                                    language="yaml"
                                    fileName=".github/workflows/ci.yml"
                                    code={`name: CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linting
        run: npm run lint
      
      - name: Run tests
        run: npm run test
      
      - name: Build application
        run: npm run build
        env:
          NEXT_TELEMETRY_DISABLED: 1`}
                                />
                            </div>

                            <TipBox type="info" title="Tip para Vercel">
                                Vercel automáticamente detecta cambios en tu rama <code>main</code> y hace deploy.
                                Usa preview deployments para ramas de feature y configura dominios custom para staging.
                            </TipBox>
                        </div>
                    </CollapsibleSection>

                    {/* Tarjeta final */}
                    <Card className="bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10"></div>
                        <CardContent className="p-12 text-center relative z-10">
                            <div className="max-w-3xl mx-auto space-y-6">
                                <div className="flex justify-center">
                                    <div className="p-4 bg-white/10 rounded-full">
                                        <Rocket className="h-12 w-12" />
                                    </div>
                                </div>

                                <h2 className="text-3xl font-bold">¡Listo para el Siguiente Nivel!</h2>

                                <p className="text-lg opacity-90 leading-relaxed">
                                    Has completado la guía completa de Git. Ahora tienes las herramientas para manejar
                                    cualquier situación en el control de versiones y trabajar eficientemente en equipo.
                                </p>

                                <div className="grid md:grid-cols-2 gap-6 mt-8">
                                    <div className="text-left">
                                        <h3 className="font-semibold mb-3">🎯 Próximos Pasos</h3>
                                        <ul className="space-y-2 text-sm opacity-90">
                                            <li>• Practica con repositorios reales</li>
                                            <li>• Configura tu flujo de trabajo ideal</li>
                                            <li>• Explora GitHub Actions y CI/CD</li>
                                            <li>• Aprende Git hooks avanzados</li>
                                        </ul>
                                    </div>

                                    <div className="text-left">
                                        <h3 className="font-semibold mb-3">🚀 Recursos Avanzados</h3>
                                        <ul className="space-y-2 text-sm opacity-90">
                                            <li>• Git Submodules y Subtrees</li>
                                            <li>• Semantic Versioning</li>
                                            <li>• Automated Changelogs</li>
                                            <li>• Advanced Branching Strategies</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex flex-wrap justify-center gap-3 mt-8">
                                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                                        <Github className="mr-2 h-4 w-4" />
                                        GitHub Actions
                                    </Badge>
                                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                                        <Terminal className="mr-2 h-4 w-4" />
                                        Git Hooks
                                    </Badge>
                                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                                        <GitMerge className="mr-2 h-4 w-4" />
                                        Advanced Merging
                                    </Badge>
                                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                                        <Code2 className="mr-2 h-4 w-4" />
                                        Submodules
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};