pipeline {
    agent any
    // Utilisation de variable pour ce connecter au compte dockerhub et pour le Quality Gate de hadolint (plus le nombre est élevé plus c'est plus tolérant aux erreurs )
    // Release_laravelproject c'est le nom du repertoire DockerHub
    environment{
        QUALITY_GATE_HADOLINT ='5'
        Credential_id_var = 'ZakariaRezzoug'
        Release_laravelproject = "zakariarezzoug/projetlaravel"
    }
	stages {
        // Récupération  du projet depuis Github sur la branche main
	    stage ('Checkout'){
	        agent any
	       steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], extensions: [[$class: 'DisableRemotePoll']], userRemoteConfigs: [[url: 'https://github.com/zaki-re/LaraStart']]])
	       }
	    }
        // On build notre projet a l'aide du DockerFile qui va etre mit comme agent
        // Et exectuer tous les commendes de laravel pour tester que l'application build correctement 
		stage ('Build') {
                agent {
        		        dockerfile {
            		        dir 'dockerfileAgent'
            		        filename 'Dockerfile'
         		        }
      		        }
		 	steps {
		 		sh 'cp .env.example .env'
		 		sh 'composer install'
		 		sh 'php artisan key:generate'
		 	}
		}
        // Faire les test unitaire avec une commande intégré dans Laravel dans le dossier test on peut ajouter les tests qu'on veut dans notre cas il y'en a deja deux
		stage('Unit Test') {
            agent {
        		    dockerfile {
            		    dir 'dockerfileAgent'
            		    filename 'Dockerfile'
         		    }
      		    }
		    steps {
                sh 'php artisan test'
			}
		}
        // On test la couverture du code toujours avec une commande proposé par Laravel qui nous affiche les taux de couverture et on peut rajouter des paramettres directement dans laravel
		stage("Code coverage") {
            agent {
        		    dockerfile {
            		    dir 'dockerfileAgent'
            		    filename 'Dockerfile'
         		    }
      		    }
		    steps {
               sh "vendor/bin/phpunit --coverage-html reports/"
            }
        }
        // Utiliser Hadolint pour tester le fichier dockerfile dans notre projet, utilisation d'une image Hadolint officiel de DockerHub Quality Gate pour donner le seuil de tolérance
        // Apres effacer hadolint_lint.json pour ne pas avoir d'encombrement au relancement (post elle est éxecuter dans tout les cas meme si il y a une erreur)
        stage ("lint Dockerfile") {
            agent {
                docker {
                    image 'hadolint/hadolint:latest-debian'
                }
            }
            steps {
                sh 'touch hadolint_lint.json '
                sh 'hadolint -f json Dockerfile | tee -a hadolint_lint.json'
                recordIssues qualityGates: [[threshold: QUALITY_GATE_HADOLINT , type: 'TOTAL', unstable: false]], tools: [hadoLint(pattern: 'hadolint_lint.json')]
                archiveArtifacts 'hadolint_lint.json'
            }
            post {
                    always {
                        sh 'rm hadolint_lint.json'
                    }
                }
        }
        // On build et on déploie notre Dockerfile de notre image dans le DockerHub 
        stage("Deploy Docker Image ") {
            agent any
		    steps {
		        script{
                    withDockerRegistry(credentialsId: Credential_id_var) {
                        docker.build("${env.Release_laravelproject}:${env.BUILD_NUMBER}").push()
                    }
		        }
            }
        }
	}
    // On efface le tout a la fin pour ne pas avoir de probleme au relancement 
	post {
		always {
			        cleanWs(cleanWhenNotBuilt: false,
                    deleteDirs: true,
                    disableDeferredWipeout: true,
                    notFailBuild: true,
                    patterns: [[pattern: '.gitignore', type: 'INCLUDE'],
                               [pattern: '.propsfile', type: 'EXCLUDE']])

		}
  	}
}
