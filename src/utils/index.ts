'use strict';
const crypto = require('crypto');

const generateUUId = (len: number) => {
  // isFinite 判断是否为有限数值
  if (!Number.isFinite(len)) {
    throw new TypeError('Expected a finite number');
  }

  return crypto.randomBytes(Math.ceil(len / 2)).toString('hex').slice(0, len);
};

/**
 * 格式化时间
 * @param date 日期
 */
const formatDate = (date: number) => {
  const dateTime = new Date(date)
  const YY = dateTime.getFullYear()
  const MM =
    dateTime.getMonth() + 1 < 10 ? '0' + (dateTime.getMonth() + 1) : dateTime.getMonth() + 1
  const D =
    dateTime.getDate() < 10 ? '0' + dateTime.getDate() : dateTime.getDate()
  const hh =
    dateTime.getHours() < 10 ? '0' + dateTime.getHours() : dateTime.getHours()
  const mm =
    dateTime.getMinutes() < 10 ? '0' + dateTime.getMinutes() : dateTime.getMinutes()
  const ss =
    dateTime.getSeconds() < 10 ? '0' + dateTime.getSeconds() : dateTime.getSeconds()
  return `${YY}-${MM}-${D} ${hh}:${mm}`
}

/**
 * 格式化音乐时长
 * @param time 时长
 */
const formatDuration = (time: number) => {
  if (!time) {
    return '00:00'
  }
  var minutes = Math.floor(time / 60)
  var seconds = time - minutes * 60

  return (
    (minutes > 0 ? minutes + ':' : '0:') +
    (seconds > 0 ? (Math.floor(seconds) < 10 ? '0' + Math.floor(seconds) : Math.floor(seconds)) : '00')
  )
}

/**
 * 防抖函数:
 *      防止抖动，单位时间内事件触发会被重置，避免事件被误伤触发多次。
 *      代码实现重在清零 clearTimeout
 */
export function debounce(f: Function, wait = 100) {
  let debounceTimer
  clearTimeout(debounceTimer) // 防抖重在清零
  debounceTimer = setTimeout(f, wait)
}

/**
 * 节流函数:
 *      节流：控制流量，单位时间内事件只能触发一次，如果服务器端的限流即 Rate Limit。
 *      代码实现重在开锁关锁 timer=timeout; timer=null
 */
export function throttle(f: Function, wait = 100) {
  let throttleTimer
  if (throttleTimer) {
    return
  }
  throttleTimer = setTimeout(() => {
    f()
    throttleTimer = null // 节流重在开关锁
  }, wait)
}

// 视频播放
export function audioPlay(url: string, {
  closeLoadingFn
}: {
  [key: string]: Function
}) {

  let audioPlayer: any

  if (audioPlayer) {
    audioPlayer.pause()
  }
  audioPlayer = new Audio(url);
  // 开始播放
  audioPlayer.onloadeddata = function () {
    audioPlayer.play();
  }
  // 播放失败
  audioPlayer.onerror = function () {
    closeLoadingFn && closeLoadingFn()
  }
  // 播放结束
  audioPlayer.onended = function () {
    closeLoadingFn && closeLoadingFn()
  }
  // 暂停时触发
  audioPlayer.onpause = function () {
    closeLoadingFn && closeLoadingFn()
  }
  return audioPlayer
}

// 延迟方法
export function delay(time = 50) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}


export {
  generateUUId,
  formatDate,
  formatDuration
};
