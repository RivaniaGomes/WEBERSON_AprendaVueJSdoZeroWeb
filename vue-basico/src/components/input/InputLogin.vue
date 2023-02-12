<template>
    <div>
        <label for="">{{ label }}</label> <br>
        <input :placeholder="placeHolder" :type="type" name="" id="">
    </div>
</template>

<script>
export default {
    name: "InputLogin",
    props: {
        label: { type: String. require},
        placeHolder: {type: String},
        type: { type: String, default: 'text'}
    },
    data() {
        return{
        }
    }
}
</script>

<style scoped>
    input {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0px;
        display: inline-block;
        border: 1px solid #ddd;
        outline: none;
        border-radius: 4px;
        box-sizing: border-box;
    }
</style>