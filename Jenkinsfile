pipeline {
	agent { label 'angular-docker' }
	options { timeout (time: 20) }
	stages {
		stage('install') {
			steps {
				sh 'npm clean-install'
			}
		}
		stage('compile') {
			steps {
				sh 'ng build'
			}
		}
	}
}
