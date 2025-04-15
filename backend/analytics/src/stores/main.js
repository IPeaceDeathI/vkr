import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import{Modules, Api} from '~/import_helper'

Vue.use(Vuex)
const _isAdmin = adhiqudhaidhqwdq73193;
export const store = new Vuex.Store({
    state: {
        isAdmin : _isAdmin,
        module : Modules.MULTI_CHANNEL_ANALYTICS,
        time_period:{
          from: null,
          to: null,
        },
        users: {}
        ,
      },
      getters: {
        GET_MODULE:state=>{
          return state.module;
        },
        GET_TIME_FROM:state=>{
          return state.time_period.from;
        },
        GET_TIME_TO:state=>{
          return state.time_period.to;
        },
        GET_USERS:state=>{
            return state.users;
        },
        IS_ADMIN:state=>{
          return state.isAdmin;
        }
      },
      mutations: {
        SET_MODULE:(state, module)=>{
            state.module = module
        },
        SET_TIME_FROM:(state, time_from)=>{
          state.time_period.from = time_from;
        },
        SET_TIME_TO:(state, time_to)=>{
          state.time_period.to = time_to;
        },
        UPDATE_USERS:(state, users_array)=>{
          users_array.forEach(users_array => {
            const id = users_array.user_id
            Vue.set(state.users, id, users_array)
            Vue.set(users_array, 'sites', {}) //TODO решить костыль
          });

        },
        UPDATE_SITES:(state, tmp)=>{
          const sites_array = tmp['sites_array']
          const user_id =  tmp ['user_id']
          let sites_object = {};

          sites_array.forEach(site => {
            if(site.id==null)
                return
            sites_object[`${site.id}`] = site;
          });
          Vue.set(state.users[user_id], 'sites', sites_object)
        },
        UPDATE_PAGES:(state, tmp)=>{
            const pages_array = tmp['pages_array']
            let pages_object = {};
            pages_array.forEach(page => {
                if(page.id==null)
                    return
                page['page_id'] = page.id
                pages_object[`${page.id}`] = page;
            });
            const user_id =  tmp ['user_id']
            const id_site =  tmp ['id_site']
            Vue.set(state.users[user_id].sites[id_site], 'pages', pages_object)
        }
      },
    actions: {
        SET_MODULE(context, module){
            context.commit('SET_MODULE',module);
        },
        SET_TIME_FROM(context, time_from){
            context.commit('SET_TIME_FROM', time_from);
        },
        SET_TIME_TO(context, time_to){
            context.commit('SET_TIME_TO', time_to);
        },
        UPDATE_USERS(context) {
          axios
          .get('/analytics/api/users')
          .then(function(response) {
              if (Api.validate_axios_response(response)){
                  let result = response.data.data
                  context.commit("UPDATE_USERS", result)
                  context.dispatch("UPDATE_SITES");
              }
              else {
                  console.log("error", response)
              }
          }).catch(function(error){
                  console.log(error)
          });       
        },
        UPDATE_SITES(context) {
            //TODO интересно, что тут будет если во время обновления ихменится состояние
            const users = context.getters.GET_USERS;

            for (let key in users){
              let user = users[key]
              const user_id = user.user_id;
              if(user_id!=null){
              
                axios
                .get(`/analytics/api/sites?id_user=${user_id}`)
                .then(function(response, ){
                    if (Api.validate_axios_response(response)){
                        const sites_array = response.data.data
                        context.commit("UPDATE_SITES", {sites_array ,user_id})
                        context.dispatch("UPDATE_PAGES");
                    }
                    else {
                        console.log("error", response)
                    }
                })
              }
            }
        },
        UPDATE_PAGES(context){
            const users = context.getters.GET_USERS;
            for (const id in users){
                const user = users[id]
                const user_id = id;
                if(user.sites==null)
                    continue;
                for(const id in user.sites){
                    const site = user.sites[id]
                    if(site.id==null)
                        continue;
                    const id_site = site.id;
                    axios
                    .get(`/analytics/api/pages?id_site=${id_site}`)
                    .then(function(response, ){
                        if (Api.validate_axios_response(response)){
                            const pages_array = response.data.data
                            context.commit("UPDATE_PAGES", {pages_array ,id_site, user_id})
                        }
                        else {
                            console.log("error", response)
                        }
                    })
                }
            }
        }
    }
  })