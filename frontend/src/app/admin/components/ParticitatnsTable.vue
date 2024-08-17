<template>
  <div class="table-container">
    <div
      v-for="(item, idx) in props.list"
      :key="idx"
      class="table-item"
    >
      <div class="item-componet">
        <div class="input-group mb-2">
          <i :class="['input-group-text', 'bi', `bi-person-check`]"></i>
          <input 
            v-model="item.name"
            type="text" 
            class="form-control form-control-sm" 
            placeholder="이름" 
            disabled
          >
        </div>
  
        <div class="input-group mb-2">
          <i :class="['input-group-text', 'bi', `bi-lock`]"></i>
          <input
            v-model="item.phone_number" 
            type="text" 
            class="form-control form-control-sm" 
            placeholder="전화번호 뒤 4자리" 
            disabled
          >
        </div>
      </div>

      <div class="item-componet">
        <div class="input-group mb-2">
          <i :class="['input-group-text', 'bi', `bi-check-circle`]"></i>
          <input 
            :value="item.check_event ? '참석' : '불참석'"
            type="text" 
            class="form-control form-control-sm"
            :class="[{
              'text-primary' : item.check_event,
              'text-danger':!item.check_event,
            }]" 
            disabled
          >
        </div>
  
        <div class="input-group mb-2">
          <i :class="['input-group-text', 'bi', `bi-person-add`]"></i>
          <input
            v-model="item.number_of_participant" 
            type="text" 
            class="form-control form-control-sm" 
            disabled
          >
        </div>
      </div>

      <div class="input-group mb-2">
        <i :class="['input-group-text', 'bi', `bi-chat-dots`]"></i>
        <textarea 
          v-model="item.comments"
          class="form-control form-control-sm" 
          placeholder="축하 메시지" 
          rows="2"
          disabled
        >
        </textarea>
      </div>

      <div>
        <span>메모: </span>
        <textarea
          v-model="item.hidden_comments"
          class="form-control form-control-sm"
        >
        </textarea>
      </div>

      <span class="count">{{ idx + 1 }}</span>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  list: {
    type: [null, Array],
    default: () => []
  }
})
</script>
<style lang="scss" scoped>
.table-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.table-item {
  position: relative;
  width: 400px;
  // display: flex;
  // align-items: center;
  // gap: 4px;
  // margin: 4px 0;
  padding: 4px;
  border: 1px solid #e9ecef;
  border-radius: 10px;

  &:hover {
    // background-color: rgb(221, 220, 220);
  }

  .item-componet {
    display: flex;
    gap: 4px;
  }

  .count {
    position: absolute;
    display: inline-flex;
    width: 16px;
    height: 16px;
    font-size: 12px;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    top: -5px;
    left: -5px;
    border-radius: 50%;
    border: 1px solid black;
  }
}
</style>