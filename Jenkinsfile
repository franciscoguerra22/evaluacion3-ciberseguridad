pipeline {
    agent any
    stages {
        stage('Construcción') {
            steps {
                echo 'Construyendo la imagen Docker de la aplicación...'
                sh 'docker build -t mi-app-segura .'
            }
        }
        stage('Despliegue Temporal') {
            steps {
                echo 'Levantando la aplicación para el escaneo de seguridad...'
                // Detiene contenedores previos si existen y levanta el nuevo en el puerto 3000
                sh 'docker stop app-vulnerable-test || true'
                sh 'docker rm app-vulnerable-test || true'
                sh 'docker run -d -p 3000:3000 --name app-vulnerable-test mi-app-segura'
                // Espera 5 segundos a que la aplicación de Node.js esté totalmente arriba
                sh 'sleep 5'
            }
        }
        stage('Pruebas de Seguridad (OWASP ZAP)') {
            steps {
                echo 'Iniciando escaneo automatizado con OWASP ZAP...'
                // Ejecuta el escáner baseline de ZAP apuntando a nuestra app en el puerto 3000
                sh 'docker run --rm -v $(pwd):/zap/wrk/:rw ghcr.io/zaproxy/zaproxy:stable zap-baseline.py -t http://localhost:3000 -r reporte_zap.html || true'
            }
        }
        stage('Limpieza y Producción') {
            steps {
                echo 'Moviendo la aplicación al entorno de producción...'
                sh 'docker stop app-vulnerable-test || true'
                sh 'docker stop app-produccion || true'
                sh 'docker rm app-produccion || true'
                sh 'docker run -d -p 3000:3000 --name app-produccion mi-app-segura'
                echo 'Pipeline finalizado con éxito. El reporte de seguridad ha sido generado.'
            }
        }
    }
}
