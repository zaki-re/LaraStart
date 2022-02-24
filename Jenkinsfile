pipeline {
    agent any
    environment{
        QUALITY_GATE_HADOLINT ='5'
    }
	stages {
	    stage ('Checkout'){
	        agent any
	       steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], extensions: [[$class: 'DisableRemotePoll']], userRemoteConfigs: [[url: 'https://github.com/zaki-re/LaraStart']]])	           
	       }
	    }
	   stage ("lint dockerfile") {
            agent {
                docker {
                    image 'hadolint/hadolint:latest-debian'
                }
            }
            steps {
                sh 'touch hadolint_lint.json'
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
		stage ('Build') {
                agent { dockerfile true }
		 	steps {
		 		sh 'cp .env.example .env'
		 		sh 'composer install'
		 		sh 'php artisan key:generate'
		 	}
		}
		stage('Unit Test') {
            agent { dockerfile true }
		    steps {
                sh 'php artisan test'
			}
		}
		stage("Code coverage") {
            agent { dockerfile true }
		    steps {
               sh "vendor/bin/phpunit --coverage-html reports/"
             cleanWs()

            }
        }
		
	}
}
