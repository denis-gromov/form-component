	<template>
	<form id="form">  
		<fieldset v-for="field in fields" v-if="myFields.indexOf(field.fieldType) != -1"> 

			<label> {{field.label}} </label>
													<!-- может можно отдельно type и остальное? экономия кода -->
			<input v-if="field.fieldType == 'email'" 
				   :name="field.name" 
				   type="email" 
				   v-model="field.value"
				   :class="{ warning: (field.required && !field.value.length), danger: (field.required && !field.validation(field.value)) }"
				   >
						<!-- класс присваивать если есть required -->

			<input v-else-if="field.fieldType == 'password'" 
				   :name="field.name" 
				   type="password" 
				   v-model="field.value"
				   :class="{warning: (field.required && !field.value.length), danger: (field.required && !field.validation(field.value))}">

			<input v-else-if="field.fieldType == 'phone'" 
			       :name="field.name" 
				   type="number" 
				   v-model="field.value"> 

			<input v-else 
				   :name="field.name"
				   type="text"  
			       v-model="field.value">

			 <small v-if="getStatus(field)">                           
		       {{getStatus(field)}}
		    </small>       

		</fieldset>


		  <button
		    type="submit"
		    :disabled = "isDisabled"
		  >
		    Отправить
		  </button>

	</form>
</template>

<script>													//добавить стрелочные функции?
module.exports = {  
  props: ['myFields'],                  
  data () {                
    return {
    	gS: '',
    	fields: [
				    {   
				    	name: 'userEmail',             
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
					    }                
				    },
				    {
					   	name: 'userPassword',
					    label: 'Пароль',
					    fieldType: 'password',
					    type: String,
					    value: '',	
					    validation: (value) => {
					    	return value.length > 5
						},
					    required: true,
					    notice: {
					      warning: 'Поле не может быть пустым.',
					      danger: 'Поле не может содержать менее 6 символов.'
					    }			
					},
					{
		    		 	name: 'userPhone',
		    		  	label: "Phone",
		    		  	fieldType: 'phone',
		    		  	type: Number,            
		    		  	value: '',					
		    		  	validation: (value) => {
					    	return value.length > 3
						},
		    		  	required: false,
		    		  	notice: {
		    		  		danger: 'Не похоже на телефон'
		    		  	}
	    		  	},
		]  
	}   
  },
 
  methods: {	       //экономно ли так делать? Computed не принимает параметр(
  						//для этой логики getStatus будет онли для подсказок.
  	getStatus(field) {

  		if (field.required) {
	  		if (!field.value) {return field.notice.warning}
	  			else if (!field.validation(field.value)) {return field.notice.danger}
  		}
  			else if (field.validation && field.notice.danger && field.value && !field.validation(field.value)) {
  				return field.notice.danger
  			}
  				    //если что-то ввели, то либо правильно вводи, либо обнуляй
  	}
  },

  computed: {
  	isDisabled () {              
	   	for (var key in this.fields) { 
	   		var v=this.fields[key];        
			if (v.required && !v.validation(v.value)) {return true}
			   	else if (!v.required && v.value && !v.validation(v.value)) {return true}	  
	    }
	}
  }

}
</script>

<style>
	 .danger {
	 	border: 2px solid red;
	 }

	 .warning {
	 	border: 2px solid orange;
	 }

	 .success {
	 	background-color: blue;
	 }
</style>
