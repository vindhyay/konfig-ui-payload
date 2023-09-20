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
        stage('Checkout Source and find the author') {
            steps {
                checkout scm
                script {
                    def buildcause = currentBuild.getBuildCauses()
                    if (buildcause[0]._class == 'org.jenkinsci.plugins.workflow.support.steps.build.BuildUpstreamCause') {
                        env.authorName = buildcause[0].upstreamProject
                    } 
                    else {
                        env.authorName = sh(script: "git --no-pager show -s --format='%an' ${GIT_COMMIT}", returnStdout: true).trim()
                    }
                }
            }
        }

        stage('Clone app-release') {
            steps {
                dir('app-release') {
                    git(
                        url: 'https://konfig-git.tabner.com/konfig/konfig-devops/app-release.git',
                        branch: 'dev',
                        credentialsId: 'jenkins-konfig'
                    )
                }
            }
        }

    
        stage('Clone Helm Repository') {
            steps {
                dir('helm-resources') {
                    git(
                        url: 'https://konfig-git.tabner.com/konfig/konfig-devops/helm-resources.git',
                        branch: 'dev',
                        credentialsId: 'jenkins-konfig'
                    )
                }
            }
        }

        stage('Service Versions') {
            steps {
                script {
                    def json = readJSON file: 'app-release/service.json'
                    def versionnum = json[NAME]
                    env.ENV_GIT_COMMIT = sh (script: 'git log -1 --pretty=format:%h',returnStdout: true).trim()
                    env.ENV_CURRENT_DATE = sh (script: 'date +%d-%m-%Y""%H%M%S',returnStdout: true).trim()
                    env.service_version = "${versionnum}-${ENV_CURRENT_DATE}-${ENV_GIT_COMMIT}"
                }
            }
        }

        stage('Install dependencies'){
            steps {
            //sh 'npm config ls'
            echo"Let's remove the packge-lock.json to avoid any unnecessary issues"
            sh 'rm -rf package-lock.json'
            echo"now install the dependencies which will auto-generate new package-lock.json file"
            echo"this will be done in Build Docker Image Stage"
            //sh 'npm install'
            sh 'npm install'
            sh 'npm run build'
            //echo "Npm Packages has been installed"
            }
        }

        stage('SonarQube Analysis') {
            when {
                expression { params.Quality_Check }
            }
            steps {
                script {
                    def scannerHome = tool 'SonarQube'
                    withSonarQubeEnv('sonar_new') {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }

        stage('Building Docker Image') {
            steps {
                sh "docker build -t ${REPO}/${NAME} ."
                sh "docker tag ${REPO}/${NAME}:latest ${REPO}/${NAME}:${env.service_version}"
                sh "docker tag ${REPO}/${NAME}:${env.service_version} ${AWS_REPO}/${NAME}:${env.service_version}"
            }
        }

        stage('Docker Image Testing') {
            steps {
                sh "docker image inspect ${REPO}/${NAME}:${env.service_version}"
            }
        }

        stage('Push to Harbor and ECR') {
            steps {
                echo "Pushing the Docker Image to Remote Registry(Harbor)"
                sh "docker login -u $HARBOR_USER -p $HARBOR_PASSWORD harbor.tabner.com:443"
            	sh "docker push ${REPO}/${NAME}:${env.service_version}"
                sh "aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 388868315655.dkr.ecr.us-east-1.amazonaws.com"
                sh "docker push ${AWS_REPO}/${NAME}:${env.service_version}"
            }
        }

        stage('Deploy to Dev') {
            when {
                expression {
                    return env.BRANCH_NAME == 'dev';
                }
            }
            steps {
                echo "Deploying the latest version"
				script {
                    def release_name = env.NAME
                    def chartVersion = '0.1.0'
                    def serviceVersion= env.service_version
                    echo"Deploying the ${serviceVersion} version of ${release_name} in ${LOC}"
                    sh """
                    export KUBECONFIG='/home/jenkins/agent/kubeconfig/kubeconfig-${LOC}.yaml'
                    chmod 600 /home/jenkins/agent/kubeconfig/kubeconfig-${LOC}.yaml
                    cd helm-resources/${release_name}
                    helm package .
                    if helm list -n ${LOC} | grep -E '(^|[[:space:]])${release_name}([[:space:]]|\$)'; then
                    helm upgrade ${release_name} ${release_name}-${chartVersion}.tgz --set namespace=${LOC},image.version=${serviceVersion},domain=${LOC}.tabner.konfig.io,env=${LOC} -n ${LOC}
                    else
                    helm install ${release_name} ${release_name}-${chartVersion}.tgz --set namespace=${LOC},image.version=${serviceVersion},domain=${LOC}.tabner.konfig.io,env=${LOC} -n ${LOC}
                    fi
                    """
                    echo"Successfully deployed the ${serviceVersion} version of the Application ${release_name} in ${LOC}"
            	}
            }
        }

        /*stage('Deploy to Cloud Dev') {
            when {
                expression {
                    return env.BRANCH_NAME == 'dev';
                }
            }
            steps {
                echo "Deploying the latest version"
				script {
                    def release_name = env.NAME
                    def chartVersion = '0.1.0'
                    def serviceVersion= env.service_version
                    echo"Deploying the ${serviceVersion} version of ${release_name} in ${LOC}"
                    sh """
                    aws eks update-kubeconfig --region us-east-1 --name finlevit-dev
                    cd helm-resources/${release_name}
                    helm package .
                    if helm list -n ${LOC} | grep -E '(^|[[:space:]])${release_name}([[:space:]]|\$)'; then
                    helm upgrade ${release_name} ${release_name}-${chartVersion}.tgz --set namespace=${LOC},vault.role=vault-${LOC}-auth,serviceaccount=vault-${LOC}-auth,image.repository=${AWS_REPO},image.version=${serviceVersion},domain=${LOC}.tabner.finlevit.us,env=${LOC} -n ${LOC}
                    else
                    helm install ${release_name} ${release_name}-${chartVersion}.tgz --set namespace=${LOC},vault.role=vault-${LOC}-auth,serviceaccount=vault-${LOC}-auth,image.repository=${AWS_REPO},image.version=${serviceVersion},domain=${LOC}.tabner.finlevit.us,env=${LOC} -n ${LOC}
                    fi
                    """
                    echo"Successfully deployed the ${serviceVersion} version of the Application ${release_name} in ${LOC}"
            	}
            }
        }*/

        stage('Push to app-release') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'jenkins-fin-gitlab-token', variable: 'GITLAB_TOKEN')]) {
                        dir('app-release') {
                            sh '''
                                git config --global user.email "jenkins.konfig@tabnerglobal.com"
                                git config --global user.name "jenkins-konfig"
                                git pull https://oauth2:${GITLAB_TOKEN}@konfig-git.tabner.com/konfig/konfig-devops/app-release.git dev
                            '''
                            def json = readJSON file: 'config.json'
                            json[NAME] = env.service_version.toString()
                            writeFile file: 'config.json', text: groovy.json.JsonOutput.prettyPrint(groovy.json.JsonOutput.toJson(json))
                            sh '''
                                git add config.json
                                git commit -m "Upgraded ${NAME} version"
                                git push https://oauth2:${GITLAB_TOKEN}@konfig-git.tabner.com/konfig/konfig-devops/app-release.git dev
                            '''
                        }
                    }
                }
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
