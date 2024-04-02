'use client'
import {useEffect, useRef, useState} from "react";
import {useTimer} from "react-timer-hook";
import {Bars3Icon} from '@heroicons/react/24/outline'
import Image from "next/image";
import Link from "next/link";

export default function Home() {

    const [isRemind, setIsRemind] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [timerStatus, setTimerStatus] = useState(false)
    const [timerSecond, setTimerSecond] = useState(0)
    const [timerDate, setTimerDate] = useState(new Date())
    const [remindTips, setRemindTips] = useState('')
    const [showSettingModel, setShowSettingModel] = useState(false)
    const [settingHours, setSettingHours] = useState('')
    const [settingMinutes, setSettingMinutes] = useState('')
    const [settingSeconds, setSettingSeconds] = useState('')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const audioRef = useRef();

    const toggleSetting = () => {
        setShowSettingModel(showSettingModel => !showSettingModel)
    }

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.loop = true
                audioRef.current.play()
            } else {
                audioRef.current.pause()
            }
        }
    }, [isPlaying])

    const handleCloseRemind = () => {
        setIsRemind(false)
        setIsPlaying(false)
    }

    const initSeconds = 300

    const nowTime = new Date()

    nowTime.setSeconds(nowTime.getSeconds() + initSeconds)

    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({
        expiryTimestamp: nowTime, autoStart: false, onExpire: () => {
            setRemindTips('Timer countdown ends')
            setIsPlaying(true)
            setIsRemind(true)
            setTimerStatus(false)
        }
    });
    const formatNumber = (number) => {
        return String(number).padStart(2, '0');
    }

    const handleTimerDate = (number) => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + number);
        setTimerDate(time)
        return time
    }

    const handleTimerTime = () => {
        let hourSecond = Number(settingHours) * 60 * 60
        let minSecond = Number(settingMinutes) * 60
        let totalSecond = hourSecond + minSecond + Number(settingSeconds)
        if (totalSecond === 0) {
            return
        }
        setTimerSecond(totalSecond)

        const time = new Date();
        time.setSeconds(time.getSeconds() + totalSecond);
        setTimerDate(time)
        restart(time, false)
        setShowSettingModel(false)
    }

    const handleChangeHours = (e) => {
        const number = e.target.value;
        if (number >= 0 && number <= 99) {
            setSettingHours(number);
        }
    }
    const handleChangeMinutes = (e) => {
        const number = e.target.value;
        if (number >= 0 && number <= 59) {
            setSettingMinutes(number);
        }
    }
    const handleChangeSeconds = (e) => {
        const number = e.target.value;
        if (number >= 0 && number <= 59) {
            setSettingSeconds(number);
        }
    }
    return (
        <>
            <header className="sticky z-20 w-full">
                <nav className="mx-auto flex max-w-7xl p-4 items-center lg:justify-end justify-between"
                     aria-label="Global">
                    <div className="flex lg:flex-1">
                        <a href="/" className="-m-1.5 p-1.5">
                            <Image className="h-6 w-auto" src="/logo.svg" alt="timers.ing" width={24}
                                   height={24}/>
                        </a>
                        <a href="/" className="-m-1.5 ml-0.5 p-1.5 text-xl font-semibold">
                            Timers.ing
                        </a>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                        </button>
                    </div>
                    {
                        timerStatus ?
                            <div className={mobileMenuOpen ? "lg:hidden mr-4 mt-2" : "mr-4 hidden md:inline-block"}
                                 title="Setting">
                                <svg className="hover:opacity-40" aria-disabled={timerStatus} viewBox="0 0 1024 1024"
                                     width="26" height="26" fill="currentColor">
                                    <path
                                        d="M904.533333 422.4l-85.333333-14.933333-17.066667-38.4 49.066667-70.4c14.933333-21.333333 12.8-49.066667-6.4-68.266667l-53.333333-53.333333c-19.2-19.2-46.933333-21.333333-68.266667-6.4l-70.4 49.066666-38.4-17.066666-14.933333-85.333334c-2.133333-23.466667-23.466667-42.666667-49.066667-42.666666h-74.666667c-25.6 0-46.933333 19.2-53.333333 44.8l-14.933333 85.333333-38.4 17.066667L296.533333 170.666667c-21.333333-14.933333-49.066667-12.8-68.266666 6.4l-53.333334 53.333333c-19.2 19.2-21.333333 46.933333-6.4 68.266667l49.066667 70.4-17.066667 38.4-85.333333 14.933333c-21.333333 4.266667-40.533333 25.6-40.533333 51.2v74.666667c0 25.6 19.2 46.933333 44.8 53.333333l85.333333 14.933333 17.066667 38.4L170.666667 727.466667c-14.933333 21.333333-12.8 49.066667 6.4 68.266666l53.333333 53.333334c19.2 19.2 46.933333 21.333333 68.266667 6.4l70.4-49.066667 38.4 17.066667 14.933333 85.333333c4.266667 25.6 25.6 44.8 53.333333 44.8h74.666667c25.6 0 46.933333-19.2 53.333333-44.8l14.933334-85.333333 38.4-17.066667 70.4 49.066667c21.333333 14.933333 49.066667 12.8 68.266666-6.4l53.333334-53.333334c19.2-19.2 21.333333-46.933333 6.4-68.266666l-49.066667-70.4 17.066667-38.4 85.333333-14.933334c25.6-4.266667 44.8-25.6 44.8-53.333333v-74.666667c-4.266667-27.733333-23.466667-49.066667-49.066667-53.333333z m-19.2 117.333333l-93.866666 17.066667c-10.666667 2.133333-19.2 8.533333-23.466667 19.2l-29.866667 70.4c-4.266667 10.666667-2.133333 21.333333 4.266667 29.866667l53.333333 76.8-40.533333 40.533333-76.8-53.333333c-8.533333-6.4-21.333333-8.533333-29.866667-4.266667L576 768c-10.666667 4.266667-17.066667 12.8-19.2 23.466667l-17.066667 93.866666h-57.6l-17.066666-93.866666c-2.133333-10.666667-8.533333-19.2-19.2-23.466667l-70.4-29.866667c-10.666667-4.266667-21.333333-2.133333-29.866667 4.266667l-76.8 53.333333-40.533333-40.533333 53.333333-76.8c6.4-8.533333 8.533333-21.333333 4.266667-29.866667L256 576c-4.266667-10.666667-12.8-17.066667-23.466667-19.2l-93.866666-17.066667v-57.6l93.866666-17.066666c10.666667-2.133333 19.2-8.533333 23.466667-19.2l29.866667-70.4c4.266667-10.666667 2.133333-21.333333-4.266667-29.866667l-53.333333-76.8 40.533333-40.533333 76.8 53.333333c8.533333 6.4 21.333333 8.533333 29.866667 4.266667L448 256c10.666667-4.266667 17.066667-12.8 19.2-23.466667l17.066667-93.866666h57.6l17.066666 93.866666c2.133333 10.666667 8.533333 19.2 19.2 23.466667l70.4 29.866667c10.666667 4.266667 21.333333 2.133333 29.866667-4.266667l76.8-53.333333 40.533333 40.533333-53.333333 76.8c-6.4 8.533333-8.533333 21.333333-4.266667 29.866667L768 448c4.266667 10.666667 12.8 17.066667 23.466667 19.2l93.866666 17.066667v55.466666z"
                                    ></path>
                                    <path
                                        d="M512 394.666667c-64 0-117.333333 53.333333-117.333333 117.333333s53.333333 117.333333 117.333333 117.333333 117.333333-53.333333 117.333333-117.333333-53.333333-117.333333-117.333333-117.333333z m0 170.666666c-29.866667 0-53.333333-23.466667-53.333333-53.333333s23.466667-53.333333 53.333333-53.333333 53.333333 23.466667 53.333333 53.333333-23.466667 53.333333-53.333333 53.333333z"
                                    ></path>
                                </svg>
                            </div>
                            :
                            <div className={mobileMenuOpen ? "lg:hidden mr-4 mt-2" : "mr-4 hidden md:inline-block"}
                                 onClick={toggleSetting} title="Setting">
                                <svg className="cursor-pointer hover:opacity-40" aria-disabled={!timerStatus}
                                     viewBox="0 0 1024 1024" width="26" height="26" fill="currentColor">
                                    <path
                                        d="M904.533333 422.4l-85.333333-14.933333-17.066667-38.4 49.066667-70.4c14.933333-21.333333 12.8-49.066667-6.4-68.266667l-53.333333-53.333333c-19.2-19.2-46.933333-21.333333-68.266667-6.4l-70.4 49.066666-38.4-17.066666-14.933333-85.333334c-2.133333-23.466667-23.466667-42.666667-49.066667-42.666666h-74.666667c-25.6 0-46.933333 19.2-53.333333 44.8l-14.933333 85.333333-38.4 17.066667L296.533333 170.666667c-21.333333-14.933333-49.066667-12.8-68.266666 6.4l-53.333334 53.333333c-19.2 19.2-21.333333 46.933333-6.4 68.266667l49.066667 70.4-17.066667 38.4-85.333333 14.933333c-21.333333 4.266667-40.533333 25.6-40.533333 51.2v74.666667c0 25.6 19.2 46.933333 44.8 53.333333l85.333333 14.933333 17.066667 38.4L170.666667 727.466667c-14.933333 21.333333-12.8 49.066667 6.4 68.266666l53.333333 53.333334c19.2 19.2 46.933333 21.333333 68.266667 6.4l70.4-49.066667 38.4 17.066667 14.933333 85.333333c4.266667 25.6 25.6 44.8 53.333333 44.8h74.666667c25.6 0 46.933333-19.2 53.333333-44.8l14.933334-85.333333 38.4-17.066667 70.4 49.066667c21.333333 14.933333 49.066667 12.8 68.266666-6.4l53.333334-53.333334c19.2-19.2 21.333333-46.933333 6.4-68.266666l-49.066667-70.4 17.066667-38.4 85.333333-14.933334c25.6-4.266667 44.8-25.6 44.8-53.333333v-74.666667c-4.266667-27.733333-23.466667-49.066667-49.066667-53.333333z m-19.2 117.333333l-93.866666 17.066667c-10.666667 2.133333-19.2 8.533333-23.466667 19.2l-29.866667 70.4c-4.266667 10.666667-2.133333 21.333333 4.266667 29.866667l53.333333 76.8-40.533333 40.533333-76.8-53.333333c-8.533333-6.4-21.333333-8.533333-29.866667-4.266667L576 768c-10.666667 4.266667-17.066667 12.8-19.2 23.466667l-17.066667 93.866666h-57.6l-17.066666-93.866666c-2.133333-10.666667-8.533333-19.2-19.2-23.466667l-70.4-29.866667c-10.666667-4.266667-21.333333-2.133333-29.866667 4.266667l-76.8 53.333333-40.533333-40.533333 53.333333-76.8c6.4-8.533333 8.533333-21.333333 4.266667-29.866667L256 576c-4.266667-10.666667-12.8-17.066667-23.466667-19.2l-93.866666-17.066667v-57.6l93.866666-17.066666c10.666667-2.133333 19.2-8.533333 23.466667-19.2l29.866667-70.4c4.266667-10.666667 2.133333-21.333333-4.266667-29.866667l-53.333333-76.8 40.533333-40.533333 76.8 53.333333c8.533333 6.4 21.333333 8.533333 29.866667 4.266667L448 256c10.666667-4.266667 17.066667-12.8 19.2-23.466667l17.066667-93.866666h57.6l17.066666 93.866666c2.133333 10.666667 8.533333 19.2 19.2 23.466667l70.4 29.866667c10.666667 4.266667 21.333333 2.133333 29.866667-4.266667l76.8-53.333333 40.533333 40.533333-53.333333 76.8c-6.4 8.533333-8.533333 21.333333-4.266667 29.866667L768 448c4.266667 10.666667 12.8 17.066667 23.466667 19.2l93.866666 17.066667v55.466666z"
                                    ></path>
                                    <path
                                        d="M512 394.666667c-64 0-117.333333 53.333333-117.333333 117.333333s53.333333 117.333333 117.333333 117.333333 117.333333-53.333333 117.333333-117.333333-53.333333-117.333333-117.333333-117.333333z m0 170.666666c-29.866667 0-53.333333-23.466667-53.333333-53.333333s23.466667-53.333333 53.333333-53.333333 53.333333 23.466667 53.333333 53.333333-23.466667 53.333333-53.333333 53.333333z"
                                    ></path>
                                </svg>
                            </div>
                    }
                </nav>
            </header>
            <main className="flex min-h-screen flex-col items-center justify-between 2xl:p-8 p-4">

                {
                    showSettingModel &&
                    <div className="w-1/4 flex flex-warp justify-center absolute md:top-2 right-1/5 z-40 top-16">
                        <input type="number"
                               className="rounded-md bg-gray-50 focus:border-gray-500 focus:bg-white focus:ring-0 text-center mr-2 lg:min-w-24 min-w-20 p-3 dark:text-zinc-900"
                               value={settingHours} min="0" max="99" onChange={handleChangeHours}
                               placeholder="hour"/>
                        <input type="number"
                               className="rounded-md bg-gray-50 focus:border-gray-500 focus:bg-white focus:ring-0 text-center mr-2 lg:min-w-24 min-w-20 p-3 dark:text-zinc-900"
                               value={settingMinutes} min="0" max="59" onChange={handleChangeMinutes}
                               placeholder="minute"/>
                        <input type="number"
                               className="rounded-md bg-gray-50 focus:border-gray-500 focus:bg-white focus:ring-0 text-center mr-2 lg:min-w-24 min-w-20 p-31 dark:text-zinc-900"
                               value={settingSeconds} min="0" max="59" onChange={handleChangeSeconds}
                               placeholder="second"/>
                        <button
                            className="flex gap-3 rounded-md p-3 px-10 min-w-20 md:min-w-40 border-2 hover:text-zinc-400 hover:border-zinc-400 font-semibold justify-center "
                            onClick={() => {
                                handleTimerTime()
                            }}>
                            <span className="text-sm">Done</span>
                        </button>
                    </div>
                }
                <div
                    className="-mt-20 w-full flex items-center justify-center min-h-screen">
                    <div className="">
                        <div className="py-1 min-h-11 text-center text-2xl items-center">
                            {timerStatus &&
                                <>
                                    <svg className="mx-auto inline-block mr-2" viewBox="0 0 1024 1024"
                                         width="24" height="24" fill="currentColor">
                                        <path
                                            d="M512 960c49.6 0 88-38.4 88-88H424c0 49.6 38.4 88 88 88z m288.8-286.4V444.8c0-137.6-97.6-252.8-224.8-283.2v-28.8c0-32-17.6-60.8-48-67.2-44-10.4-80 23.2-80 66.4v30.4C320.8 192 223.2 307.2 223.2 444.8v228.8L136 763.2v44.8h752v-44.8l-87.2-89.6z"
                                        ></path>
                                    </svg>
                                    {formatNumber(timerDate.getHours()) + ':' + formatNumber(timerDate.getMinutes())}
                                </>
                            }
                        </div>
                        <div
                            className="text-5xl 2xl:text-16xl xl:text-12xl md:text-9xl font-bold mb-20 text-center font-mono">
                            {days > 0 && <><span>{formatNumber(days)}</span>:</>}
                            <span>{formatNumber(hours)}</span>:
                            <span>{formatNumber(minutes)}</span>:
                            <span>{formatNumber(seconds)}</span>
                        </div>
                        <div className="flex flex-wrap justify-center">
                            {
                                !timerStatus ?
                                    <button
                                        className="flex gap-3 rounded-md p-3 px-10 min-w-30 md:min-w-40 border-2 hover:text-zinc-400 hover:border-zinc-400 font-semibold"
                                        onClick={() => {
                                            setTimerStatus(true)
                                            handleTimerTime()
                                            restart(handleTimerDate(timerSecond))
                                        }
                                        }>
                                        <svg className="mx-auto" viewBox="0 0 1024 1024" width="28" height="28"
                                             fill="currentColor">
                                            <path
                                                d="M780.8 475.733333L285.866667 168.533333c-27.733333-17.066667-64 4.266667-64 36.266667v614.4c0 32 36.266667 53.333333 64 36.266667l492.8-307.2c29.866667-14.933333 29.866667-57.6 2.133333-72.533334z"
                                            ></path>
                                        </svg>
                                    </button>
                                    :
                                    isRunning ?
                                        <button
                                            className="flex gap-3 rounded-md p-3 px-10 min-w-30 md:min-w-40 border-2 hover:opacity-40 font-semibold"
                                            onClick={() => {
                                                pause()
                                            }}>
                                            <svg className="mx-auto" viewBox="0 0 1024 1024" width="28" height="28"
                                                 fill="currentColor">
                                                <path
                                                    d="M349.866667 149.333333h-14.933334c-21.333333 0-36.266667 14.933333-36.266666 34.133334v654.933333c0 19.2 14.933333 34.133333 34.133333 34.133333h14.933333c19.2 0 34.133333-14.933333 34.133334-34.133333V183.466667c2.133333-19.2-12.8-34.133333-32-34.133334z m341.333333 0h-14.933333c-21.333333 0-36.266667 14.933333-36.266667 34.133334v654.933333c0 19.2 14.933333 34.133333 34.133333 34.133333h14.933334c19.2 0 34.133333-14.933333 34.133333-34.133333V183.466667c2.133333-19.2-12.8-34.133333-32-34.133334z"
                                                ></path>
                                            </svg>
                                        </button>
                                        :
                                        <button
                                            className="flex gap-3 rounded-md p-3 px-10 min-w-30 md:min-w-400 border-2 hover:opacity-40 font-semibold"
                                            onClick={() => {
                                                setTimerStatus(false)
                                                restart(handleTimerDate(timerSecond), false)
                                            }}>
                                            <svg className="mx-auto" viewBox="0 0 1024 1024" width="28" height="28"
                                                 fill="currentColor">
                                                <path
                                                    d="M780.8 475.733333L285.866667 168.533333c-27.733333-17.066667-64 4.266667-64 36.266667v614.4c0 32 36.266667 53.333333 64 36.266667l492.8-307.2c29.866667-14.933333 29.866667-57.6 2.133333-72.533334z"
                                                ></path>
                                            </svg>
                                        </button>
                            }{
                            timerStatus ?
                                <button
                                    className="flex gap-3 rounded-md ml-10 md:ml-40 p-3 px-10 min-w-30 md:min-w-400 border-2 hover:opacity-40 font-semibold"
                                    onClick={() => {
                                        setTimerStatus(false)
                                        restart(handleTimerDate(timerSecond), false)
                                    }}>
                                    <svg className="mx-auto" viewBox="0 0 1024 1024" width="28" height="28"
                                         fill="currentColor">
                                        <path
                                            d="M720.298667 768c-12.714667 0-23.850667-4.778667-33.408-14.293333L270.293333 337.066667c-19.072-19.114667-19.072-49.322667 0-66.816 19.114667-19.072 49.322667-19.072 66.816 0l416.597334 415.018666c19.072 19.072 19.072 49.28 0 66.773334-9.557333 11.136-22.272 15.914667-33.408 15.914666z"
                                        ></path>
                                        <path
                                            d="M303.701333 768c-12.714667 0-23.850667-4.778667-33.408-14.293333-19.072-19.114667-19.072-49.322667 0-66.816l415.018667-416.597334c19.072-19.072 49.28-19.072 66.773333 0 19.114667 19.114667 19.114667 49.322667 0 66.816l-414.976 416.597334a45.781333 45.781333 0 0 1-33.408 14.293333z"
                                        ></path>
                                    </svg>
                                </button>
                                : ''
                        }
                        </div>
                    </div>
                </div>
                {isRemind && (
                    <div className="flex items-center justify-center h-screen bg-gray-200">
                        <div
                            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
                            aria-modal="true"
                            role="dialog"
                        >
                            <div
                                className="w-11/12 max-w-lg mx-auto overflow-hidden bg-white rounded shadow-lg md:w-1/2">

                                <div className="flex justify-between p-6 bg-white border-b-2">
                                    <p className="text-2xl font-bold text-zinc-900">Timer</p>
                                    <button onClick={handleCloseRemind}>
                                        <svg className="w-6 h-6 hover:opacity-60" fill="none"
                                             stroke="currentColor" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </button>
                                </div>

                                <div className="px-6 py-4 text-zinc-900">
                                    <p>{remindTips}</p>
                                </div>

                                <div className="flex justify-end px-6 py-4 bg-gray-100">
                                    <button
                                        className="px-4 py-2 font-bold min-w-20 rounded text-white bg-zinc-900 hover:bg-zinc-700"
                                        onClick={handleCloseRemind}>
                                        OK
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                )}
            </main>
            <audio ref={audioRef} className="hidden" src="/bell.mp3"/>
            <footer className="py-2 2xl:py-4l w-full mt-auto border-t z-20 text-xs">
                <div className="w-full max-w-7xl px-4 mx-auto flex items-center justify-between ">
                    <div>
                        <p>© 2024 <Link target="_blank" className="duration-150"
                                        href="https://timers.ing/">Timers.ing</Link>
                        </p>
                    </div>
                    <div className="flex">
                        <a rel="nofollow" target="_blank" aria-label="twitter"
                           className="ml-2 duration-150 hover:text-zinc-200"
                           href="https://twitter.com/AiLaunchers">
                            <svg aria-label="twitter" viewBox="0 0 24 24" aria-hidden="true" height="14" width="14"
                                 fill="currentColor">
                                <g>
                                    <path
                                        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                                </g>
                            </svg>
                        </a>
                        <a target="_blank" aria-label="GitHub" className="ml-2 duration-150 hover:text-zinc-200"
                           href="https://github.com/AiLaunchers/timers.ing">
                            <svg aria-label="github" height="14" viewBox="0 0 14 14" width="14">
                                <path
                                    d="M7 .175c-3.872 0-7 3.128-7 7 0 3.084 2.013 5.71 4.79 6.65.35.066.482-.153.482-.328v-1.181c-1.947.415-2.363-.941-2.363-.941-.328-.81-.787-1.028-.787-1.028-.634-.438.044-.416.044-.416.7.044 1.071.722 1.071.722.635 1.072 1.641.766 2.035.59.066-.459.24-.765.437-.94-1.553-.175-3.193-.787-3.193-3.456 0-.766.262-1.378.721-1.881-.065-.175-.306-.897.066-1.86 0 0 .59-.197 1.925.722a6.754 6.754 0 0 1 1.75-.24c.59 0 1.203.087 1.75.24 1.335-.897 1.925-.722 1.925-.722.372.963.131 1.685.066 1.86.46.48.722 1.115.722 1.88 0 2.691-1.641 3.282-3.194 3.457.24.219.481.634.481 1.29v1.926c0 .197.131.415.481.328C11.988 12.884 14 10.259 14 7.175c0-3.872-3.128-7-7-7z"
                                    fill="currentColor" fillRule="nonzero"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </footer>
        </>
    )
}
