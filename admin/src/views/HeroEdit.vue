<template>
  <div class="Item">
    <h1>{{ id ? "编辑" : "新建" }}英雄</h1>
    <el-form
      label-width="100px"
      @submit.native.prevent="save"
      label-position="left">
      <el-tabs value="basic" type="border-card">
        <el-tab-pane label="基本信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :headers="getAuthor()"
              :show-file-list="false"
              :on-success="res=>$set(this.model, 'avatar', res.url)"
              :before-upload="before">
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="海报">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :headers="getAuthor()"
              :show-file-list="false"
              :on-success="res=>$set(this.model, 'banner', res.url)"
              :before-upload="before">
              <img v-if="model.banner" :src="model.banner" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="类型">
            <el-select
              v-model="model.categories"
              placeholder="请选择类型"
              multiple>
              <el-option
                v-for="item in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
              v-model="model.scores.difficult"
              show-score
              :max="9"
              style="margin-top: 0.6rem"
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate
              v-model="model.scores.skills"
              show-score
              :max="9"
              style="margin-top: 0.6rem"
            ></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate
              v-model="model.scores.attack"
              show-score
              :max="9"
              style="margin-top: 0.6rem"
            ></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate
              v-model="model.scores.survive"
              show-score
              :max="9"
              style="margin-top: 0.6rem"
            ></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.item1" placeholder="请选择装备" multiple>
              <el-option
                v-for="item in items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.item2" placeholder="请选择装备" multiple>
              <el-option
                v-for="item in items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input v-model="model.useTips" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input v-model="model.battleTips" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input v-model="model.teamTips" type="textarea"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能信息" name="skills">
          <el-button @click="model.skills.push({})" style="  margin-bottom:2rem;"><i class="el-icon-plus"></i>添加技能</el-button>
          <el-row type="flex" style="flex-wrap:wrap; justify-content: space-between;">
            <el-col v-for="(item, i) in model.skills" :key="i" :md="11">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="冷却值">
                <el-input v-model="item.delay"></el-input>
              </el-form-item>
              <el-form-item label="消耗">
                <el-input v-model="item.cost"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/upload'"
                  :show-file-list="false"
                  :on-success="res => $set(item,'icon',res.url)"
                  :headers="getAuthor()"
                  :before-upload="before">
                    <img v-if="item.icon" :src="item.icon" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input v-model="item.tips" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="danger" @click="model.skills.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="英雄关系" name="partners">
          <el-button @click="model.partners.push({})" style="  margin-bottom:2rem;"><i class="el-icon-plus"></i>最佳搭档</el-button>
          <el-row type="flex" style="flex-wrap: wrap" :gutter="30">
            <el-col :md="12" v-for="(item, index) in model.partners" :key="index" style="margin-top: 30px">
              <el-form-item label="名称">
                <el-select v-model="item.hero" filterable  placeholder="请选择">
                  <el-option
                    v-for="item in heroList"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" :rows="3" v-model="item.description" placeholder="请输入搭档描述"></el-input> 
              </el-form-item>
              <el-form-item>
                <el-button type="danger" size="small" @click="model.partners.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-button @click="model.enemies.push({})" style="  margin-bottom:2rem;"><i class="el-icon-plus"></i>被谁克制</el-button>
          <el-row type="flex" style="flex-wrap: wrap" :gutter="30">
            <el-col :md="12" v-for="(item, index) in model.enemies" :key="index" style="margin-top: 30px">
              <el-form-item label="名称">
                <el-select v-model="item.hero" filterable  placeholder="请选择">
                  <el-option
                    v-for="item in heroList"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" :rows="3" v-model="item.description" placeholder="请输入搭档描述"></el-input> 
              </el-form-item>
              <el-form-item>
                <el-button type="danger" size="small" @click="model.enemies.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-button @click="model.preies.push({})" style="  margin-bottom:2rem;"><i class="el-icon-plus"></i>克制谁</el-button>
          <el-row type="flex" style="flex-wrap: wrap" :gutter="30">
            <el-col :md="12" v-for="(item, index) in model.preies" :key="index" style="margin-top: 30px">
              <el-form-item label="名称">
                <el-select v-model="item.hero" filterable  placeholder="请选择">
                  <el-option
                    v-for="item in heroList"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" :rows="3" v-model="item.description" placeholder="请输入搭档描述"></el-input> 
              </el-form-item>
              <el-form-item>
                <el-button type="danger" size="small" @click="model.preies.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item>
        <el-button type="success" native-type="submit" class="submit">{{
          button
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.el-form {
  width: 900px;
  margin: 0 auto;
}
.submit {
  margin-top: 4rem;
  position: absolute;
  left: 40%;
}
h1 {
  display: inline-block;
  transform: translateX(20%);
}
.avatar {
  width: 7rem;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 7rem;
  height: 7rem;
  line-height: 7rem;
  transform: translateX(-20%);
  border: 1px dashed rgb(158, 156, 156);
  margin-bottom: 30px;
  text-align: center;
}
.avatar-uploader-icon:hover {
  border: 1px dashed rgb(1, 183, 255);
}
</style>
<script>
export default {
  data() {
    return {
      model: {
        scores: {
          difficult: 5,
          skills: 5,
          attack: 5,
          survive: 5,
        },
        skills: [],
        partners:[],
        enemies:[],
        preies:[],
      },
      items: {},
      title: "新增英雄",
      heroList:[],
      button: "保存",
      categories: [],
    };
  },
  created() {
    this.id && this.fetch();
    this.fetchCategories();
    this.fetchItems();
    this.fetchHero();
  },
  props: {
    id: {},
  },
  methods: {
    async save() {
      if (this.id) {
        let { data } = await this.$http.put(
          `/rest/heroes/${this.id}`,
          this.model
        );
        console.log(data);
      } else {
        let { data } = await this.$http.post("/rest/heroes", this.model);
        console.log(data);
      }
      this.$router.push("/heroes/list");
      this.$message({
        type: "success",
        message: `${this.button}成功`,
      });
    },
    async fetch() {
      let { data } = await this.$http.get(`/rest/heroes/${this.id}`);
      this.model = Object.assign({}, this.model, data);
      this.button = "修改";
    },
    async fetchCategories() {
      let { data } = await this.$http.get(`/rest/categories`);
      this.categories = data;
    },
    async fetchItems() {
      let { data } = await this.$http.get(`/rest/items`);
      this.items = data;
    },
    async fetchHero() {
      let { data } = await this.$http.get(`/rest/heroes`);
      this.heroList = data;
    },
    before() {},
  },
};
</script>