pipeline {
    agent any

    stages {
        stage('Construcción (Build)') {
            steps {
                echo 'Construyendo la imagen Docker de la aplicación...'
                sh 'docker build -t mi-app-vulnerable:latest .'
            }
        }

        stage('Despliegue Temporal para Pruebas') {
            steps {
                echo 'Levantando el contenedor para el escaneo de seguridad...'
                // Detenemos cualquier contenedor previo por si acaso
                sh 'docker rm -f app_prueba || true'
                sh 'docker run -d -p 3000:3000 --name app_prueba mi-app-vulnerable:latest'
                // Damos unos segundos para que el servidor Node.js inicie
                sleep 5
            }
        }

        stage('Pruebas de Seguridad (OWASP ZAP)') {
            steps {
                echo 'Iniciando escaneo automatizado con OWASP ZAP...'
                // Escaneamos el puerto 3000 donde está nuestra app
                sh 'docker run --rm -v "$(pwd)":/zap/wrk/:rw zaproxy/zap-stable zap-baseline.py -t http://172.17.0.1:3000 -r reporte_zap.html || true'
                echo 'Escaneo finalizado. Reporte guardado.'
            }
        }

        stage('Despliegue a Producción (Deploy)') {
            steps {
                echo 'Limpiando entorno de pruebas y simulando despliegue final...'
                sh 'docker rm -f app_prueba'
                echo 'Despliegue exitoso.'
            }
        }
    }
    post {
        always {
            echo 'Guardando trazabilidad y evidencias para la Auditoría de Seguridad.'
            // Esto guardará el reporte HTML en la interfaz de Jenkins
            archiveArtifacts artifacts: 'reporte_zap.html', allowEmptyArchive: true
        }
    }
}
