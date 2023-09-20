library identifier: 'jenkinsfile-library@master', retriever: modernSCM([$class: 'GitSCMSource', remote: 'https://konfig-git.tabner.com/konfig/konfig-devops/jenkinsfile-library.git', credentialsId: 'jenkins-konfig'])

pipeline {
    agent {
        label "kubeagent"
    } 
    parameters {
        booleanParam(name: 'Quality_Check', defaultValue: false, description: 'Use this for scanning the code with SonarQube and image with Trivy during deployment.')
    }
    tools {
        nodejs "Node"
    }
    triggers {
        gitlab(triggerOnPush: true, triggerOnMergeRequest: true)
    }
    environment {
        GIT_SSL_NO_VERIFY = 'true'
        NAME = "finlevit-payload"
        REPO = "harbor.tabner.com:443/konfig"
        AWS_REPO = "388868315655.dkr.ecr.us-east-1.amazonaws.com/konfig"
        LOC = "dev"
    }

    stages {
        stage('Checkout and author') {
            steps {
                checkout scm
                preBuild linkedLOC:"${LOC}"
            }
        }

        stage('Build') {
            steps {
                buildNpm "Building ${NAME}"
            }
        }

        stage('SonarQube Analysis') {
            steps {
                sonarCoverage "Scanning ${NAME}"
            }
        }

        stage('Building Docker Image') {
            steps {
                buildDocker "Building Docker image of ${NAME}"
            }
        }

        stage('Docker Image Testing') {
            steps {
                inspectDocker "Testing Docker image of ${NAME}"
            }
        }  

        stage('Push to Harbor and ECR') {
            steps {
                publishDocker "Publishing Docker image of ${NAME} to Harbor and AWS ECR"
            }
        }
        
        stage('Deploy to onPrem') {
            steps {
                script {
                    def chartVersion = '0.1.0'
                    deployHelm.onprem  linkedLOC: "${LOC}", release_name: env.NAME, serviceVersion: env.service_version, linkedREPO: "${REPO}"
            	}
            }
        }

        stage('Deploy to cloud') {
            steps {
                script {
                    def chartVersion = '0.1.0'
                    deployHelm.cloud  linkedLOC: "${LOC}", release_name: env.NAME, serviceVersion: env.service_version, linkedREPO: "${AWS_REPO}"
            	}
            }
        }

        stage('Push to app-release') {
            steps {
                updateJson "Updating the existing service version in the config.json file in app-release repo"
            }
        }
    }
    
    post {
        success {
            script{
                def message = "**Build SUCCESS** ✅ : ${currentBuild.fullDisplayName}\nTriggered By : ${env.authorName} \n[Build info](${env.BUILD_URL})"
                def url = 'https://teams.tabner.us/hooks/sj3omweopfdydjezn4ngjh947w'
                def payload = [
                    text: message,
                    username: "JENKINS-BOT",
                    icon_url: "https://www.jenkins.io/images/logos/jenkins/jenkins.svg"
                ]
                httpRequest(url: url, contentType: 'APPLICATION_JSON', httpMode: 'POST', requestBody: groovy.json.JsonOutput.toJson(payload))
            }
        }
        failure {
            script{
                def message = "**Build FAILURE** ❌ : ${currentBuild.fullDisplayName}\nTriggered By : ${env.authorName} \n[Build info](${env.BUILD_URL})"
                def url = 'https://teams.tabner.us/hooks/sj3omweopfdydjezn4ngjh947w'
                def payload = [
                    text: message,
                    username: "JENKINS-BOT",
                    icon_url: "https://www.jenkins.io/images/logos/fire/fire.svg"
                ]
                httpRequest(url: url, contentType: 'APPLICATION_JSON', httpMode: 'POST', requestBody: groovy.json.JsonOutput.toJson(payload))
            }
        }
        always {
            cleanWs()
        }
    }
}
