import{Route} from '~/import_helper'

export const NestedTable = {
    template : `
    <div class="table-2d">
    <table>
      <thead>
        <tr>
            <th v-for="key in columns"
                @click="sortBy(key.key)"
                :class="{ active: sortKey == key.key }">
                    {{ capitalize(key.name) }}
                <span class="arrow" :class="sortOrders[key.key] > 0 ? 'asc' : 'dsc'">
                </span>
            </th>
        </tr>
      </thead> 
      <tbody>
        <template v-for="(entry, index) in filteredHeroes" >
          <tr>
            <td v-for="key in columns" :key="key.key"
              @click.exact="onClick(entry, index, key)"
              @click.ctrl.exact="onCtrlClick(entry, index, key)">
              {{show(entry[key.key])}}
            </td>
          </tr>
          <tr class="nested-table" v-if="hasNested(index)" :key="index">
            <td colspan="200">
              <nested-table 
                :heroes="nestedData"
                :columns="gridColumns"
                :nestedColumns = "nestedColumns"
                :filter-key="searchQuery"
              ></nested-table>
            </td> 
          </tr>  
        </template>
      </tbody>
    </table>
    </div>   
    `,
    name : 'nested-table',
    props:{
        heroes: [Object , Array],
        columns: Array,
        nestedColumns : Object,
        filterKey: Array,
    },
    components : {
      'nested-table' : this,
    },
    data(){
        const sortOrders = {};
        this.columns.forEach(function(item) {
          sortOrders[item.key] = 1;
        });
        return {
          sortKey: '',
          sortOrders,
          nestedData : null,
          indexOfNestedData: null,
          searchQuery: null,
          gridColumns: [],
        }
    },

 
    computed:{
     
        filteredHeroes(){
            const sortKey = this.sortKey
            const filterKey = this.filterKey && this.filterKey.toLowerCase()
            const order = this.sortOrders[sortKey] || 1
            let heroes = []
            if(this.heroes instanceof Object){
              for (var id in this.heroes){
                heroes.push(this.heroes[id])
              }
            } else if (this.heroes instanceof Array){
              for (var _elem in this.heroes[0]){
                heroes.push(_elem)
              }
            }
            if (filterKey) {
              heroes = heroes.filter(function(row) {
                return Object.keys(row).some(function(key) {
                  return (
                    String(row[key])
                      .toLowerCase()
                      .indexOf(filterKey) > -1
                  )
                })
              })
            }
            if (sortKey) {
              heroes = heroes.slice().sort(function(a, b) {
                a = a[sortKey]
                b = b[sortKey]
                return (a === b ? 0 : a > b ? 1 : -1) * order
              })
            }
            return heroes
        }
    },
    mounted(){
        console.log(111111)
    },
    methods: {
      hasNested(index){
        return this.nestedData && index === this.indexOfNestedData
      },
      onClick(row, index, key){
        this.gridColumns = null
        this.indexOfNestedData = null
        this.nestedData =  null;
        if(row[key.key] instanceof Array || row[key.key] instanceof Object){
          if(this.nestedColumns[key.key]!=null){
            this.gridColumns = this.nestedColumns[key.key];
          }
          this.indexOfNestedData = index
          this.nestedData =  row[key.key];
        } 
        if(key.key=='page_id'){
          Route.to_page(row[key.key])
        }
      },
      onCtrlClick(row, index, key){
        if(key.key=='page_id'){
          Route.to_contructor(row[key.key])
        }
      },
      show(value){
        if(value instanceof Object){
          let count = 0;
          for (let key in value) {
              count++
          }
          value = count;
        }
        if(value instanceof Array){
          value = value.length
        } 
        return value;
      },
      capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
      },
      sortBy(key) {
        this.sortKey = key
        this.sortOrders[key] = this.sortOrders[key] * -1
      },
    }
}
