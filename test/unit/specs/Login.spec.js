import Vue from 'vue'
import Login from '@/components/Login'

describe('Login.vue', () => {
  it('should render correct content', () => {
    const Constructor = Vue.extend(Login)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.header strong').textContent)
      .to.equal('login')
  })
})
