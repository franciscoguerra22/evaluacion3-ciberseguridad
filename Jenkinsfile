pipeline {
    agent any
    stages {
        stage('Construcción') {
            steps {
                echo 'Empezando la construcción con Docker...'
                sh 'docker build -t mi-app-segura .'
            }
        }
        stage('Pruebas de Seguridad') {
            steps {
                echo 'Ejecutando pruebas... (Espacio reservado para OWASP ZAP)'
            }
        }
        stage('Despliegue') {
            steps {
                echo 'Desplegando en el entorno de producción...'
                sh 'docker run -d -p 3000:3000 --name app-produccion mi-app-segura || true'
            }
        }
    }
}
