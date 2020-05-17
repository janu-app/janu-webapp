<template>
  <div class="field is-narrow">
    <label class="label is-small">{{label}}</label>
    <div class="control">
      <div class="select">
        <select v-model="form.value" @change="$emit('selected', form.value)">
          <option v-for="option in options" :key="option.value" :value="option.value">{{option.name}}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['label', 'options'],
  data() {
    return {
      form: {
        value: ''
      }
    }
  },
};
</script>