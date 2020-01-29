<template>
  <div class="banner question">
    <!-- 表单提交 -->
    <el-row>
      <el-col>
        <h1 class="question-title">Customer Service (Contact us)</h1>
      </el-col>
      <el-col>
        <el-form :model="form" label-position="top" :rules="formRules">
          <p class="question-form__title">1. Wowcher Code</p>
          <el-form-item prop="wowcherCode">
            <el-input
              placeholder="Wowcher Code"
              v-model="form.wowcherCode"
            ></el-input>
          </el-form-item>
          <p class="question-form__title">2. Your Name</p>
          <el-form-item prop="name">
            <el-input placeholder="Name" v-model="form.name"></el-input>
          </el-form-item>
          <p class="question-form__title">3. Mobile Number</p>
          <el-form-item prop="phone">
            <el-input placeholder="Phone" v-model="form.phone"></el-input>
          </el-form-item>
          <p class="question-form__title">4. Email</p>
          <el-form-item prop="email">
            <el-input placeholder="Email" v-model="form.email"></el-input>
          </el-form-item>
          <p class="question-form__title">5. Question Type</p>
          <el-form-item prop="questionType">
            <el-input
              placeholder="Question Type"
              v-model="form.questionType"
            ></el-input>
          </el-form-item>
          <p class="question-form__title">6. Message</p>
          <el-form-item prop="question">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="Question"
              v-model="form.question"
            ></el-input>
          </el-form-item>
          <p class="question-form__title">7. Photos</p>
          <el-form-item prop="imgs">
            <el-upload
              action
              list-type="picture-card"
              :before-upload="handleBeforeUpload"
              :on-remove="hanldeRemove"
              :file-list="form.imgs"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <footer>
      <el-button
        type="primary"
        class="question-form__submit"
        @click="handleSubmit"
        >Submit</el-button
      >
    </footer>
  </div>
</template>

<script>
import { Form, Row, Col, FormItem, Button, Input, Upload } from "element-ui";
// import toblob from '@/core/util/toblob';
import toBase64 from "@/core/util/toBase64";
export default {
  components: {
    [Form.name]: Form,
    [Col.name]: Col,
    [Row.name]: Row,
    [FormItem.name]: FormItem,
    [Button.name]: Button,
    [Input.name]: Input,
    [Upload.name]: Upload
  },
  // code  姓名 电话 邮箱  问题类型 你的问题  上传图片
  data: () => ({
    form: {
      wowcherCode: "",
      name: "",
      phone: "",
      email: "",
      questionType: "",
      question: "",
      imgs: []
    },
    formRules: Object.freeze({
      wowcherCode: {
        required: true,
        validator: (rule, value, callback) => {
          let rules = /[0-9a-zA-z]{6}-[0-9a-zA-z]{6}$/;
          if (!rules.test(value)) {
            callback(
              new Error(
                "Please enter Wowcher Code in format as shown in guide。"
              )
            );
          } else {
            callback();
          }
        }
      },
      name: {
        required: true,
        message: "required"
      },
      phone: {
        required: true,
        message: "required"
      },
      email: {
        required: true,
        type: "email"
      },
      questionType: {
        required: true,
        message: "required"
      },
      question: {
        required: true,
        message: "required"
      },
      imgs: {
        required: true,
        message: "此項必填"
      }
    })
  }),
  methods: {
    handleSubmit() {},
    handleBeforeUpload(file) {
      let include = ["image/png", "image/jpeg", "image/jpg"];
      if (!include.includes(file.type)) {
        this.$message.error("上傳格式不對");
        return false;
      }
      let img = {
        name: file.name,
        url: toBase64(file)
      };
      this.form.imgs.push(img);
      return false;
    },
    hanldeRemove(file) {
      if (file.status == "success") {
        this.form.imgs = this.form.imgs.filter(img => {
          return img.url != file.url;
        });
      }
    }
  },
  beforeCreate() {}
};
</script>
<style lang="scss" scoped>
.question {
  padding: 30px 100px 50px 100px;
  box-sizing: border-box;
  // height: 100%;
  @media screen and (max-width: 768px) {
    padding: 10px;
  }
}
.question-title {
  text-align: center;
  color: #1ea0fa;
}
.question-form__title {
  color: black;
  font-size: 16px;
  font-weight: bold;
}
.question-footer {
  position: fixed;
  bottom: 0px;
}
.question-form__submit {
  width: 50%;
  margin: 0 auto;
  display: block;
}
</style>
