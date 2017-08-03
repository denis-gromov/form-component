<template>
		<form> 
		  <fieldset >
		    <label>
		      {{fields.userEmail.label}}               <!-- нельзя совместить v-model и :type в одном инпуте -->
		    </label>
		    <input
		      type="email"               
		      name="userEmail"  
		      :class= "classObject.email" 
		      v-model= "fields.userEmail.value" 

		    >
		    <small v-if="errors(this.classObject.email)">                           
		      {{this.notices.mail}}
		    </small>
		  </fieldset>

		  <fieldset >             
		    <label>
		      {{fields.userPassword.label}}
		    </label>
		    <input 
		      type="password" 
		      name="userPassword" 
		      :class = "classObject.password" 
		      v-model = "fields.userPassword.value"
		    >
		    <small v-if="errors(this.classObject.password)">   
		    	{{this.notices.password}}                        
		    </small>
		  </fieldset>

		  <button
		    type="submit"
		    :disabled = "isDisabled"
		  >
		    Отправить
		  </button>


		  <button @click="checkProps"> check props </button>

		                <p> {{message}} </p>
		    <!-- <p v-for="item in list"> {{item}} </p> -->
		  

		</form>
</template>

<script>
module.exports = {  
  props: ['fields2'],                  
  data () {
    return {
    
    	list: ['hello'],
    	message: '',

    	fields: {
			  userEmail: {
			    label: 'E-mail',
			    fieldType: 'email',
			    type: String,               
			    value: '',                  
			    validation: (value) => {
			      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			      return re.test(value)
			    },
			    required: true,
			    notice: {
			      warning: 'Поле не может быть пустым.',
			      danger: 'Проверьте правильность введенного адреса.'
			    },
			  },
			  userPassword: {
			    label: 'Пароль',
			    fieldType: 'password',
			    type: String,
			    value: '',
			    validation: (value) => {
			      return value.length > 5
			    },
			    required: true,
			    notice: {
			      danger: 'Поле не может содержать менее 6 символов.'
			    }
			  }
		}   
    }
  },

 methods: {	

 	checkProps() {

 		this.message = "hy bro"
 		 // alert(this.fields2);
 		 // alert(typeof(this.fields2));

 	// 	var tags = this.fields2;
 	// //	alert(tags);
 	// 	var re = /\s*,\s*/;
 	//  //this.list = tags.split(re);
 	//  	var newList = tags.split(re);
 	//  //this.list.$set(newList);
 	//   //this.list.push('buy');
 	//   //Vue.set(list, 5, 'new');
 	//   this.list.splice(3,1,'new');
 	//  alert(this.list);

 	},

 	errors: function(obj) {               //проверяет наличие полей со значением true в объекте
 		for (var key in obj) {
         	if (obj[key] == true) return true;
        }
 	},
 },

 computed: {                   
  	classObject: function() {            //выч.св-во, возвращающее объект, хранящий классы для input-ов
  		var result = {}

  		if (this.fields.userEmail.required) {
	  		result.email = {
	  		 'warning': !this.fields.userEmail.value,
	         'danger' : this.fields.userEmail.value && (!this.fields.userEmail.validation(this.fields.userEmail.value)),
	         'success': this.fields.userEmail.value && (this.fields.userEmail.validation(this.fields.userEmail.value))
	  		};
	  	};

	  	if (this.fields.userPassword.required) {
	  		result.password = {
	  		 'danger': !this.fields.userPassword.validation(this.fields.userPassword.value),
	       	 'success': this.fields.userPassword.value && this.fields.userPassword.validation(this.fields.userPassword.value)
	  		};
	  	};
  		//console.log('obj=', result);
  		return result
  	},

    notices: function() {        //возвращает объект для вывода предупреждений
    	var result = {};
    	for (var key in this.classObject.email) {           
		  if (this.classObject.email[key] == true) {result.mail = this.fields.userEmail.notice[key]}
		};

		for (var key in this.classObject.password) {
		  if (this.classObject.password[key] == true) {result.password = this.fields.userPassword.notice[key]};
		};
		return result; 			
    },

 	isDisabled: function() {              //св-во, отвечающее за активность кнопки "подтвердить"
	   	for (var key in this.fields) {           
			   if (this.fields[key].required && !this.fields[key].validation(this.fields[key].value)) return true	  
	    }
	}
 }
}
</script>

<style>

</style>


