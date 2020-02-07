<template>
  <div class="banner question">
    <!-- 表单提交 -->
    <el-row>
      <el-col>
        <div>
          <img class="question-logo" src="@/assets/img/logo.jpg" alt="" />
        </div>
        <h1 class="question-title">Customer Service (Contact us)</h1>
        <p class="question-title-tip">
          Our Customer Service Team will contact you regarding to your issue
          shortly, it may take up to 24 hours to reply your case.
        </p>
      </el-col>
      <el-col>
        <el-form
          ref="form"
          :model="form"
          label-position="top"
          :rules="formRules"
        >
          <p class="question-form__title">1. Wowcher Code</p>
          <p class="question-form__tip">
            Please enter a valid code, which is similar to "KDIW3D-KISHRO".
          </p>
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
          <p class="question-form__tip">
            Please enter your email in order to get further touch.
          </p>
          <el-form-item prop="email">
            <el-input placeholder="Email" v-model="form.email"></el-input>
          </el-form-item>
          <p class="question-form__title">5. Topic</p>
          <p class="question-form__tip"></p>
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
                :value="item.caseTypeCode"
                :label="item.caseType"
              >
                <span style="float: left">{{ item.caseType }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  item.caseTypeMessage
                }}</span>
              </el-option>
            </el-select>
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
          <p class="question-form__title">7. Images or Videos (optional)</p>
          <p class="question-form__tip">
            Please provide additional images or videos to address the problem.
            (Maximum 5 images or videos can be uploaded).
          </p>
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
              :loading="btnLoading"
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
    <div
      class="question-success-container"
      v-if="showSuccess"
      @click="showSuccess = false"
    >
      <div class="question-success" @click.stop>
        <div class="question-success__title">We Received your case.</div>
        <img
          class="question-success__img"
          src="@/assets/img/success.jpg"
          alt=""
        />
        <div class="question-success__tip">
          Our Customer Service Team will contact you regarding to your issue
          shortly, it may take up to 24 hours to reply your case.
        </div>
        <i class="question-success__icon" @click="showSuccess = false">X</i>
      </div>
    </div>
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
    btnLoading: false,
    showSuccess: false,
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
      }
      // imgs: {
      //   required: true,
      //   message: "此項必填"
      // }
    })
  }),
  methods: {
    setValue() {
      let formData = new FormData();
      let obj = {
        wowcherCode: this.form.wowcherCode,
        customerName: this.form.name,
        email: this.form.email,
        phone: this.form.phone,
        caseTypeCode: this.form.questionType,
        message: this.form.question
      };
      formData.append("data", JSON.stringify(obj));
      this.form.originImgs.forEach((file, index) => {
        formData.append(`image${index}`, file, file.name);
      });
      return formData;
    },
    handleSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.btnLoading = true;
          axios({
            url: "/customerservice/add",
            method: "POST",
            headers: {
              "Content-Type": "multipart/form-data"
            },
            data: this.setValue()
          })
            .then(
              res => {
                if (res) {
                  // this.$message.success("提交成功");
                  this.showSuccess = true;
                } else {
                  // this.$message.success("提交失敗");
                }
              },
              () => {
                // this.$message.success("提交失敗");
              }
            )
            .finally(() => {
              this.btnLoading = false;
            });
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
.question-success-container {
  width: 100%;
  height: 100%;
  position: fixed;
  background: transparent;
  top: 0px;
  left: 0px;
}
.question-success {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 450px;
  @media screen and (max-width: 768px) {
    width: 80%;
  }
  transform: translate(-50%, -50%);
  background: #f8f8f8;
  padding: 20px 25px 30px 35px;
  box-sizing: border-box;
  border-radius: 10px;
  text-align: center;
  .question-success__icon {
    position: absolute;
    right: 10px;
    color: white;
    top: 10px;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    color: gray;
  }
  .question-success__img {
    width: 70%;
  }
  .question-success__title {
    text-align: center;
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 18px;
    color: #4caf50;
  }
  .question-success__tip {
    text-align: center;
    font-size: 14px;
    color: gray;
  }
}
</style>
