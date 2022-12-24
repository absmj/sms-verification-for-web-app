const firebaseConfig = {
    apiKey: "AIzaSyDO4FQY1Em9L4VH_vEh8WJBuaQJUlYlrgs",
    authDomain: "test-2a9ef.firebaseapp.com",
    projectId: "test-2a9ef",
    storageBucket: "test-2a9ef.appspot.com",
    messagingSenderId: "906681414771",
    appId: "1:906681414771:web:b62c9199452f46895ea606",
    measurementId: "G-1JEKTDJHW8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
    el: "#app",
    data() {
        return {
            loaded: null,
            sendingSms: false,
            verify: null
        }
    },

    methods: {
        async phoneAuth() {
            let verify = false;
            //get the number
            const number = document.getElementById('phoneNumber').value;
            // alert(number);
            //it takes two parameter first one is number and second one is recaptcha
            await firebase.auth().signInWithPhoneNumber(number, window.recaptchaVerifier).then(function(confirmationResult) {
                //s is in lowercase
                window.confirmationResult = confirmationResult;
                coderesult = confirmationResult;
                verify = true;
                alert("Message sent");
            }).catch(function(error) {
                verify = false;
                alert(error.message);
            });

            this.verify = verify;
        },
        
        codeverify() {
            const code = document.getElementById('verificationCode').value;
        
        
            coderesult.confirm(code).then(function(result) {
                alert("Successfully registered");
                const user = result.user;
                console.log(user);
            }).catch(function(error) {
                alert(error.message);
            });
        }        
    },

    created() {
        this.loaded = true;
        this.verify = false;
    },

    mounted() {
        
        if(!this.verify && this.loaded) {
            window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
            recaptchaVerifier.render();
        }
        
    },
})