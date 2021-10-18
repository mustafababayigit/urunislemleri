<template>
    <div class="container">
        <div class="row  mt-5">
            <div class="col-md-4 offset-4 card card-primary p-3 border"
                 :class="{'border-primary' : isUser, 'border-success' : !isUser }">
                <h3
                        :class="{'text-primary' : isUser, 'text-success' : !isUser }"
                        class="text-center mb-3 mt-3">Vue.js | challenge</h3>
                <hr>
                <form @submit.prevent="onSubmit">
                    <div class="form-group">
                        <label>E-posta Adresiniz</label>
                        <input v-model="user.email" type="email" class="form-control"
                               placeholder="E-posta adresinizi giriniz">
                    </div>
                    <div class="form-group">
                        <label>Şifre</label>
                        <input v-model="$v.user.password.$model" type="password" class="form-control" placeholder="Şifrenizi giriniz">
                        <small v-if="!$v.user.password.required" class="form-text text-danger">Zorunlu alan!</small>
                        <small v-if="!$v.user.password.numeric" class="form-text text-danger">Şifreniz rakamlardan oluşmalı!</small>
                        <small v-if="!$v.user.password.minLength" class="form-text text-danger">Şifreniz en az {{$v.user.password.$params.minLength.min}} karakter olmalı!</small>
                        <small v-if="!$v.user.password.maxLength" class="form-text text-danger">Şifreniz en fazla {{$v.user.password.$params.maxLength.max}} karakter olmalı!</small>
                    </div>
                    <div v-if="!isUser" class="form-group">
                        <label>Şifre Tekrar</label>
                        <input v-model="$v.user.repassword.$model" type="password" class="form-control" placeholder="Şifrenizi tekrar giriniz">
                        <small v-if="!$v.user.repassword.numeric" class="form-text text-danger">Şifreniz rakamlardan oluşmalı!</small>
                        <small v-if="!$v.user.repassword.sameAs" class="form-text text-danger">Girdiğiniz şifreler aynı olmalı!</small>
                    </div>
                    <div class="button-container d-flex  flex-column align-items-center">
                        <button type="submit" :disabled="$v.$invalid" :class="{'btn-primary' : isUser, 'btn-success' : !isUser }"
                                class="btn btn-block mb-2">
                            {{ isUser ? 'Giriş Yap' : 'Kayıt Ol' }}
                        </button>
                        <a href="#" @click.prevent="isUser=!isUser" class="text-secondary">
                            {{ isUser ? 'Üye değilim' : 'Üyeliğim var'}}
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    import { required, email, numeric, minLength, maxLength, sameAs, between } from "vuelidate/lib/validators"
    export default {
        data() {
            return {
                user: {
                    email: null,
                    password: null,
                    repassword : null,
                },
                isUser: false
            }
        },
        validations: {
            user:{
                password: {
                    required,
                    numeric,
                    minLength: minLength(6),
                    maxLength: maxLength(16),
                },
                repassword: {
                    required,
                    numeric,
                    minLength: minLength(6),
                    maxLength: maxLength(16),
                    sameAs: sameAs('password')
                },
            }
        },
        methods: {
            onSubmit() {
                this.$store.dispatch("login", {...this.user, isUser: this.isUser})
                    .then(response => {
                        this.$router.push("/")
                    })
            }
        }
    }
</script>
