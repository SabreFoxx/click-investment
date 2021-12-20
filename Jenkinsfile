pipeline {
	agent { label 'angular-docker-label' }
	options { timeout (time: 30) }
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
		stage('upload to S3 bucket') {
            steps {
                withAWS(region:'eu-west-3') {
					sh 'echo "uploading output to S3 bucket"'
					s3Upload(
						profileName: 'deployment-user'
						file: 'dist',
						selectedRegion: 'eu-west-3',
						uploadFromSlave: true,
						useServerSideEncryption: true,
						bucket:'click-investment'
					)
				}
            }
        }
	}
}
