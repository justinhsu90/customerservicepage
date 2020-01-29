<template>
  <div class="banner question">
    <!-- 表单提交 -->
    <el-row>
      <el-col>
        <div>
          <img class="question-logo" src="@/assets/img/logo.jpg" alt="" />
        </div>
        <h1 class="question-title">Customer Service (Contact us)</h1>
        <p class="question-title-tip">提示</p>
      </el-col>
      <el-col>
        <el-form
          ref="form"
          :model="form"
          label-position="top"
          :rules="formRules"
        >
          <p class="question-form__title">1. Wowcher Code</p>
          <p class="question-form__tip">提示</p>
          <el-form-item prop="wowcherCode">
            <el-input
              placeholder="Wowcher Code"
              v-model="form.wowcherCode"
            ></el-input>
          </el-form-item>
          <p class="question-form__title">2. Your Name</p>
          <p class="question-form__tip">提示</p>
          <el-form-item prop="name">
            <el-input placeholder="Name" v-model="form.name"></el-input>
          </el-form-item>
          <p class="question-form__title">3. Mobile Number</p>
          <p class="question-form__tip">提示</p>
          <el-form-item prop="phone">
            <el-input placeholder="Phone" v-model="form.phone"></el-input>
          </el-form-item>
          <p class="question-form__title">4. Email</p>
          <p class="question-form__tip">提示</p>
          <el-form-item prop="email">
            <el-input placeholder="Email" v-model="form.email"></el-input>
          </el-form-item>
          <p class="question-form__title">5. Question Type</p>
          <p class="question-form__tip">提示</p>
          <el-form-item prop="questionType">
            <!-- <el-input
              placeholder="Question Type"
              v-model="form.questionType"
            ></el-input> -->
            <el-select
              class="question-form__select"
              v-model="form.questionType"
              placeholder="Question Type"
            >
              <el-option
                v-for="(item, index) in questionTypes"
                :key="index"
                :value="item.caseType"
              >
                <span style="float: left">{{ item.caseType }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  item.caseTypeMessage
                }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <p class="question-form__title">6. Message</p>
          <p class="question-form__tip">提示</p>
          <el-form-item prop="question">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="Question"
              v-model="form.question"
            ></el-input>
          </el-form-item>
          <p class="question-form__title">7. Photos</p>
          <p class="question-form__tip">提示</p>
          <el-form-item prop="imgs">
            <el-upload
              action
              accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
              list-type="picture-card"
              :before-upload="handleBeforeUpload"
              :on-remove="hanldeRemove"
              :file-list="form.imgs"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="question-form__submit"
              @click="handleSubmit"
              >Submit</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <footer class="question-copyright">
      Copyright © 2020 MagicTrend All Rights Reserved.
    </footer>
  </div>
</template>

<script>
import {
  Form,
  Row,
  Col,
  FormItem,
  Button,
  Input,
  Upload,
  Select,
  Option
} from "element-ui";
import toBase64 from "@/core/util/toBase64";
import axios from "@/core/network/axios";
export default {
  components: {
    [Form.name]: Form,
    [Col.name]: Col,
    [Row.name]: Row,
    [FormItem.name]: FormItem,
    [Button.name]: Button,
    [Input.name]: Input,
    [Upload.name]: Upload,
    [Select.name]: Select,
    [Option.name]: Option
  },
  // code  姓名 电话 邮箱  问题类型 你的问题  上传图片
  data: () => ({
    questionTypes: [],
    form: {
      wowcherCode: "",
      name: "",
      phone: "",
      email: "",
      questionType: "",
      question: "",
      imgs: [],
      originImgs: []
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
    setValue() {
      let formData = new FormData();
      formData.append("wowcherCode", this.form.wowcherCode);
      formData.append("customerName", this.form.name);
      formData.append("email", this.form.email);
      formData.append("phone", this.form.phone);
      formData.append("caseType", this.form.questionType);
      formData.append("message", this.form.question);
      this.form.originImgs.forEach(file => {
        formData.append("imageList", file, file.name);
      });
      return formData;
    },
    handleSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          axios({
            url: "/customerservice/add",
            method: "POST",
            headers: {
              "Content-Type": "multipart/form-data"
            },
            data: this.setValue()
          }).then(
            () => {
              this.$message.success("上传成功");
            },
            () => {
              this.$message.success("上传失败");
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleBeforeUpload(file) {
      let img = {
        name: file.name,
        url: toBase64(file)
      };
      this.form.imgs.push(img);
      this.form.originImgs.push(file);
      return false;
    },
    hanldeRemove(file) {
      if (file.status == "success") {
        let index;
        this.form.imgs = this.form.imgs.filter((img, i) => {
          if (img.url == file.url) {
            index = i;
          }
          return img.url != file.url;
        });
        if (typeof index == "number") {
          this.form.originImgs.splice(index, 1);
        }
      }
    }
  },
  beforeCreate() {
    axios({
      url: "/customerservice/value/caseType",
      methods: "get"
    }).then(res => {
      this.questionTypes = res || [];
    });
  }
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
.question-logo {
  width: 200px;
  @media screen and (max-width: 768px) {
    width: 200px;
  }
}
.question-title {
  text-align: center;
  color: #333;
}
.question-form__title {
  color: #4caf50;
  font-size: 16px;
  font-weight: bold;
}
.question-form__tip {
  font-size: 12px;
  color: #808080;
}
.question-form__select {
  width: 50%;
}
.question-footer {
  position: fixed;
  bottom: 0px;
}
.question-copyright {
  margin-top: 40px;
  text-align: center;
  font-size: 16px;
}
.question-form__submit {
  width: 50%;
  margin: 0 auto;
  display: block;
}
.question-title-tip {
  font-size: 14px;
  color: #808080;
  text-align: center;
}
</style>
