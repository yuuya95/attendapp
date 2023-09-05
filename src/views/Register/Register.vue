<template>
    <h1>アカウント作成</h1>
    <p style="color: red;">{{ errorMessage }}</p>
    <p>{{ user.name }}</p>
    <p>{{ user.grade }}</p>
    <p>{{ user.state }}</p>
    <div>
        <ul class="choose_tab">
            <li v-bind:class="{'check': isST === true, 'uncheck': isST === false}"  class="choose_tab_one" @click="st_choose">生徒用</li>
            <li  v-bind:class="{'check': isST === false, 'uncheck': isST === true}" class="choose_tab_one" @click="tc_choose">教師用</li>
        </ul>
    </div>
    <div class="teacher" v-if="isST === false">
        <div class="container">
            <p>名前</p>
            <input type="text" class="form" v-model="tc_name">
        </div>
        <div class="container">
            <p>メールアドレス</p>
            <input type="email" class="form" v-model="tc_email">
        </div>
        <div class="container">
            <p>パスワード</p>
            <input type="password" class="form" v-model="tc_pass">
        </div>
        <div class="container">
            <p>パスワード再入力（確認用）</p>
            <input type="password" class="form" v-model="tc_passRe">
        </div>
        <div>
            <p>学年団</p>
            <select v-model="tc_grade" id="tc_grade">
                <option value="" disabled selected style="display:none;">学年を選択</option>
                <option value=1>中学1年</option>
                <option value=2>中学2年</option>
                <option value=3>中学3年</option>
                <option value=4>高校1年</option>
                <option value=5>高校2年</option>
                <option value=6>高校3年</option>
                <option value=0>高校3年</option>
            </select>
        </div>
        <p><button class="sb_btn" @click="registerTC">登録する</button></p>
    </div>
    <div class="student" v-else>
        <div class="container">
            <p>名前</p>
            <input type="text" class="form" v-model="st_name" required>
        </div>
        <div class="container">
            <p>メールアドレス</p>
            <input type="email" class="form" v-model="st_email">
        </div>
        <div class="container">
            <p>パスワード</p>
            <input type="password" class="form" v-model="st_pass">
        </div>
        <div class="container">
            <p>パスワード再入力（確認用）</p>
            <input type="password" class="form" v-model="st_passRe">
        </div>
        <div>
            <p>学年</p>
            <select v-model="st_grade" id="st_grade">
                <option value="" disabled selected style="display:none;">学年を選択</option>
                <option value=1>中学1年</option>
                <option value=2>中学2年</option>
                <option value=3>中学3年</option>
                <option value=4>高校1年</option>
                <option value=5>高校2年</option>
                <option value=6>高校3年</option>
            </select>
        </div>
        <div>
            <p>クラス</p>
            <select v-model="st_classes" id="classes">
                <option value="" disabled selected style="display:none;">クラスを選択</option>
                <option value=1>1組</option>
                <option value=2>2組</option>
                <option value=3>3組</option>
                <option value=4>4組</option>
                <option value=5>5組</option>
                <option value=6>6組</option>
            </select>
        </div>
        <div>
            <p>番号</p>
            <input type="number" class="form" v-model="st_number">
        </div>
        <p><button class="sb_btn" @click="registerST">登録する</button></p>
    </div>
</template>


<script>
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore";
import { ref } from "vue";// 1
import { auth, db } from "../../firebase"
import { useUserStore } from '../../stores/user'

export default {
    name: 'RegisterView',
    setup(){
        // 教師の情報
        const tc_grade = ref()
        const tc_passRe = ref()
        const tc_pass = ref()
        const tc_email = ref()
        const tc_name = ref()

        // 生徒の情報
        const st_grade = ref()
        // const st_passRe = ref()
        const st_pass = ref()
        const st_email = ref()
        const st_name = ref()
        const st_classes = ref()
        const st_number = ref()

        const userID = ref()

        // Pinia
        const user = useUserStore()

        // 生徒用を選択しているか否か
        const isST = ref(true);
        const tc_choose = () => {
            isST.value = false
            console.log(isST)
        }
        const st_choose = () => {
            isST.value = true
            console.log(isST)
        }

        // 教師の登録
        const registerTC = async () => {
            try {
                await createUserWithEmailAndPassword(auth, tc_email.value, tc_pass.value)
                .then((userCredential) => {
                    userID.value = userCredential.user.uid;
                })
                .catch((error) => {
                    console.log(error.code);
                });

                await sendEmailVerification(auth.currentUser)

                await signOut(auth)

                const data = {
                    name: tc_name.value,
                    grade: tc_grade.value,
                    state: "tc"
                }
                // user.$patch({
                //     name: tc_name,
                //     grade: tc_grade.value,
                //     state: 'tc',
                // })
                // console.log(user.name, user.grade, user.state)
                const docRef = doc(db, "user", userID.value);
                await setDoc(docRef, data);
                // this.$router.push({name: 'registerSecondST', params: {email: this.email, password: this.password}})
            } catch (error) {
                console.log(error)
            }
        }
        const registerST = async () => {
            try {
                await createUserWithEmailAndPassword(auth, st_email.value, st_pass.value)
                .then((userCredential) => {
                    userID.value = userCredential.user.uid;
                })
                .catch((error) => {
                    console.log(error.code);
                });

                await sendEmailVerification(auth.currentUser)

                await signOut(auth)

                const data = {
                    name: st_name.value,
                    grade: st_grade.value,
                    classes: st_classes.value,
                    number: st_number.value,
                    state: "st"
                }
                // user.$patch({
                //     name: tc_name,
                //     grade: tc_grade.value,
                //     state: 'tc',
                // })
                // console.log(user.name, user.grade, user.state)
                const docRef = doc(db, "user", userID.value);
                await setDoc(docRef, data);
                // this.$router.push({name: 'registerSecondST', params: {email: this.email, password: this.password}})
            } catch (error) {
                console.log(error)
            }
        }
        return{
            isST,
            tc_pass,
            tc_email,
            tc_grade,
            tc_name,
            tc_passRe,
            st_pass,
            st_email,
            st_grade,
            st_name,
            st_classes,
            st_number,
            userID,
            user,

            tc_choose,
            st_choose,
            registerTC,
        }
    },
}
</script>


<style scoped> 
.container{
    margin: 30px 0;
}

.sb_btn{
    margin: 20px 0;
}

.choose_tab{
    display: flex;
    justify-content: center;
    padding: 0;
    margin: 30px 30;
}
.choose_tab_one{
    margin: 0 20px;
    list-style: none;
    padding: 5px 10px;
    cursor: pointer;
    text-decoration: underline;
}
.check{
    font-weight: bold;
}
</style>

